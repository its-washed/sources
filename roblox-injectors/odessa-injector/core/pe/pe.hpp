#pragma once
// < guard >

#include <Windows.h>
#include <cstdint>
#include <cstring>
#include <iostream>

#include <core/process/process.hpp>

namespace pe
{
	__forceinline std::uintptr_t load_file( const char* path )
	{
		const auto file = CreateFileA( path, GENERIC_READ, 0, nullptr, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, nullptr );
		if ( file == INVALID_HANDLE_VALUE )
			return 0;

		const auto size = GetFileSize( file, nullptr );
		auto* buffer = VirtualAlloc( nullptr, size, MEM_COMMIT | MEM_RESERVE, PAGE_READWRITE );

		DWORD read = 0;
		if ( !buffer || !ReadFile( file, buffer, size, &read, nullptr ) || *reinterpret_cast< WORD* >( buffer ) != IMAGE_DOS_SIGNATURE )
		{
			CloseHandle( file );

			if ( buffer )
				VirtualFree( buffer, 0, MEM_RELEASE );

			return 0;
		}

		CloseHandle( file );
		return reinterpret_cast< std::uintptr_t >( buffer );
	}

	__forceinline IMAGE_NT_HEADERS* headers( std::uintptr_t base )
	{
		return reinterpret_cast< IMAGE_NT_HEADERS* >( base + reinterpret_cast< IMAGE_DOS_HEADER* >( base )->e_lfanew );
	}

	__forceinline void apply_relocations( BYTE* base, IMAGE_NT_HEADERS* nt_hdrs, std::int64_t delta )
	{
		auto& dir = nt_hdrs->OptionalHeader.DataDirectory[ IMAGE_DIRECTORY_ENTRY_BASERELOC ];
		if ( !dir.VirtualAddress || !dir.Size )
			return;

		auto* block = reinterpret_cast< IMAGE_BASE_RELOCATION* >( base + dir.VirtualAddress );
		const auto* end = reinterpret_cast< BYTE* >( block ) + dir.Size;

		while ( reinterpret_cast< BYTE* >( block ) < end && block->SizeOfBlock )
		{
			const auto count = ( block->SizeOfBlock - sizeof( IMAGE_BASE_RELOCATION ) ) / sizeof( WORD );
			auto* entries = reinterpret_cast< WORD* >( block + 1 );

			for ( UINT i = 0; i < count; i++ )
			{
				if ( ( entries[ i ] >> 12 ) == IMAGE_REL_BASED_DIR64 )
				{
					auto* patch = reinterpret_cast< std::uint64_t* >( base + block->VirtualAddress + ( entries[ i ] & 0xFFF ) );
					*patch += delta;
				}
			}

			block = reinterpret_cast< IMAGE_BASE_RELOCATION* >( reinterpret_cast< BYTE* >( block ) + block->SizeOfBlock );
		}
	}

	// resolve IAT against modules loaded in the REMOTE process (not the injector)
	__forceinline bool apply_imports( BYTE* base, IMAGE_NT_HEADERS* nt_hdrs, HANDLE process, DWORD pid )
	{
		auto& dir = nt_hdrs->OptionalHeader.DataDirectory[ IMAGE_DIRECTORY_ENTRY_IMPORT ];
		if ( !dir.VirtualAddress || !dir.Size )
			return true;

		auto* import_desc = reinterpret_cast< IMAGE_IMPORT_DESCRIPTOR* >( base + dir.VirtualAddress );
		while ( import_desc->Name )
		{
			const auto* mod_name_a = reinterpret_cast< char* >( base + import_desc->Name );

			wchar_t mod_name_w[ MAX_PATH ]{};
			MultiByteToWideChar( CP_ACP, 0, mod_name_a, -1, mod_name_w, MAX_PATH );

			const auto remote_mod = process::find_module( pid, mod_name_w );
			if ( !remote_mod.modBaseAddr )
			{
				std::cout << "[;-;] import not loaded in target -> " << mod_name_a << "\n";
				return false;
			}

			std::cout << "[;-;] resolving imports -> " << mod_name_a << "\n";

			auto* thunk = reinterpret_cast< IMAGE_THUNK_DATA64* >( base + import_desc->FirstThunk );
			auto* original = import_desc->OriginalFirstThunk
				? reinterpret_cast< IMAGE_THUNK_DATA64* >( base + import_desc->OriginalFirstThunk )
				: thunk;

			while ( original->u1.AddressOfData )
			{
				std::uintptr_t function = 0;

				if ( IMAGE_SNAP_BY_ORDINAL64( original->u1.Ordinal ) )
				{
					const auto ordinal = static_cast< DWORD >( IMAGE_ORDINAL64( original->u1.Ordinal ) );
					function = process::find_export_ordinal( process, pid, mod_name_w, ordinal );

					if ( !function )
					{
						function = process::find_export_ordinal_fallback( process, pid, mod_name_w, ordinal );
						if ( function )
							std::cout << "[;-;] export fallback -> " << mod_name_a << "!#" << ordinal << "\n";
					}

					if ( !function )
						std::cout << "[;-;] export missing -> " << mod_name_a << "!#" << ordinal << "\n";
				}
				else
				{
					auto* by_name = reinterpret_cast< IMAGE_IMPORT_BY_NAME* >( base + original->u1.AddressOfData );
					function = process::find_export( process, pid, mod_name_w, by_name->Name );

					// CRT / SEH bits often live in ntdll even when imported from vcruntime
					if ( !function )
					{
						static const wchar_t* fallbacks[] = {
							L"KERNELBASE.dll",
							L"ntdll.dll",
							L"ucrtbase.dll",
							L"VCRUNTIME140.dll",
							L"VCRUNTIME140_1.dll",
							nullptr
						};

						for ( int f = 0; fallbacks[ f ] && !function; f++ )
						{
							if ( _wcsicmp( mod_name_w, fallbacks[ f ] ) == 0 )
								continue;

							function = process::find_export( process, pid, fallbacks[ f ], by_name->Name );
							if ( !function )
								function = process::find_export_fallback( process, pid, fallbacks[ f ], by_name->Name );
						}
					}

					// remote PE walk blocked / stripped → System32 disk PE RVA + rebase
					if ( !function )
					{
						function = process::find_export_fallback( process, pid, mod_name_w, by_name->Name );
						if ( function )
							std::cout << "[;-;] export fallback -> " << mod_name_a << "!" << by_name->Name << "\n";
					}

					if ( !function )
						std::cout << "[;-;] export missing -> " << mod_name_a << "!" << by_name->Name << "\n";
				}

				if ( !function )
					return false;

				thunk->u1.Function = function;

				++thunk;
				++original;
			}

			++import_desc;
		}

		return true;
	}
}
