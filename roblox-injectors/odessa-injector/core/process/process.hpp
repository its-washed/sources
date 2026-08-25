#pragma once
// < guard >

#include <Windows.h>
#include <TlHelp32.h>
#include <Psapi.h>
#include <winternl.h>
#include <string>
#include <string_view>
#include <vector>

#include <core/native/native.hpp>

namespace process
{
	namespace session
	{
		inline DWORD pid = 0;
		inline DWORD tid = 0;
		inline HANDLE handle = nullptr;
	}

	__forceinline bool unicode_equals( const UNICODE_STRING* value, const wchar_t* target )
	{
		if ( !value || !value->Buffer || !value->Length || !target )
			return false;

		const auto length = value->Length / sizeof( wchar_t );
		if ( length != wcslen( target ) )
			return false;

		return _wcsnicmp( value->Buffer, target, length ) == 0;
	}

	__forceinline SYSTEM_PROCESS_INFORMATION* find_by_name( const wchar_t* image_name )
	{
		auto* buffer = static_cast< SYSTEM_PROCESS_INFORMATION* >( malloc( 0x400000 ) );
		if ( !buffer )
			return nullptr;

		const auto status = ntos->query_system_information(
			SystemProcessInformation,
			buffer,
			0x400000,
			nullptr );

		if ( !NT_SUCCESS( status ) )
		{
			free( buffer );
			return nullptr;
		}

		for ( auto* current = buffer;; )
		{
			if ( unicode_equals( &current->ImageName, image_name ) )
				return current;

			if ( current->NextEntryOffset == 0 )
				break;

			current = reinterpret_cast< SYSTEM_PROCESS_INFORMATION* >(
				reinterpret_cast< BYTE* >( current ) + current->NextEntryOffset );
		}

		free( buffer );
		return nullptr;
	}

	__forceinline MODULEENTRY32W find_module( DWORD pid, const wchar_t* name )
	{
		MODULEENTRY32W entry{};
		entry.dwSize = sizeof( MODULEENTRY32W );

		const auto snapshot = CreateToolhelp32Snapshot( TH32CS_SNAPMODULE | TH32CS_SNAPMODULE32, pid );
		if ( snapshot == INVALID_HANDLE_VALUE )
			return entry;

		if ( Module32FirstW( snapshot, &entry ) )
		{
			do
			{
				if ( _wcsicmp( entry.szModule, name ) == 0 )
				{
					CloseHandle( snapshot );
					return entry;
				}
			} while ( Module32NextW( snapshot, &entry ) );
		}

		CloseHandle( snapshot );
		entry.szModule[ 0 ] = 0;

		return entry;
	}

	__forceinline bool read_remote_cstr( HANDLE process, std::uintptr_t address, char* out, std::size_t out_size )
	{
		if ( !out || out_size == 0 )
			return false;

		std::size_t i = 0;
		for ( ; i + 1 < out_size; i++ )
		{
			char ch = 0;
			if ( !ntos->read( process, reinterpret_cast< void* >( address + i ), &ch, 1 ) )
				return false;

			out[ i ] = ch;
			if ( ch == '\0' )
				return true;
		}

		out[ i ] = '\0';
		return true;
	}

	__forceinline std::uintptr_t find_export( HANDLE process, DWORD pid, const wchar_t* module_name, const char* export_name );
	__forceinline std::uintptr_t find_export_ordinal( HANDLE process, DWORD pid, const wchar_t* module_name, DWORD ordinal );
	__forceinline std::uintptr_t resolve_forwarder_name( HANDLE process, DWORD pid, const char* forwarder );
	__forceinline std::uintptr_t find_export_fallback( HANDLE process, DWORD pid, const wchar_t* module_name, const char* export_name );
	__forceinline std::uintptr_t find_export_ordinal_fallback( HANDLE process, DWORD pid, const wchar_t* module_name, DWORD ordinal );

	__forceinline std::uintptr_t resolve_forwarder_name( HANDLE process, DWORD pid, const char* forwarder_in )
	{
		char forwarder[ 256 ]{};
		strncpy_s( forwarder, forwarder_in, _TRUNCATE );

		auto* sep = strchr( forwarder, '.' );
		if ( !sep )
			return 0;

		*sep = '\0';
		const char* dll_name_a = forwarder;
		const char* export_token = sep + 1;

		wchar_t dll_name_w[ MAX_PATH ]{};
		char dll_with_ext[ MAX_PATH ]{};
		strncpy_s( dll_with_ext, dll_name_a, _TRUNCATE );
		if ( !strstr( dll_with_ext, ".dll" ) && !strstr( dll_with_ext, ".DLL" ) )
			strcat_s( dll_with_ext, ".dll" );

		MultiByteToWideChar( CP_ACP, 0, dll_with_ext, -1, dll_name_w, MAX_PATH );

		std::uintptr_t resolved = 0;
		const bool by_ordinal = export_token[ 0 ] == '#';

		if ( by_ordinal )
		{
			const auto ordinal = static_cast< DWORD >( atoi( export_token + 1 ) );
			resolved = find_export_ordinal( process, pid, dll_name_w, ordinal );
			if ( !resolved )
				resolved = find_export_ordinal_fallback( process, pid, dll_name_w, ordinal );
		}
		else
		{
			resolved = find_export( process, pid, dll_name_w, export_token );
			if ( !resolved )
				resolved = find_export_fallback( process, pid, dll_name_w, export_token );
		}

		if ( !resolved )
		{
			static const wchar_t* hosts[] = {
				L"KERNELBASE.dll",
				L"kernel32.dll",
				L"ntdll.dll",
				L"ucrtbase.dll",
				nullptr
			};

			for ( int i = 0; hosts[ i ]; i++ )
			{
				if ( _wcsicmp( dll_name_w, hosts[ i ] ) == 0 )
					continue;

				if ( by_ordinal )
				{
					resolved = find_export_ordinal( process, pid, hosts[ i ], static_cast< DWORD >( atoi( export_token + 1 ) ) );
					if ( !resolved )
						resolved = find_export_ordinal_fallback( process, pid, hosts[ i ], static_cast< DWORD >( atoi( export_token + 1 ) ) );
				}
				else
				{
					resolved = find_export( process, pid, hosts[ i ], export_token );
					if ( !resolved )
						resolved = find_export_fallback( process, pid, hosts[ i ], export_token );
				}

				if ( resolved )
					break;
			}
		}

		return resolved;
	}

	__forceinline std::uintptr_t resolve_forwarder( HANDLE process, DWORD pid, std::uintptr_t forwarder_address )
	{
		char forwarder[ 256 ]{};
		if ( !read_remote_cstr( process, forwarder_address, forwarder, sizeof( forwarder ) ) )
			return 0;

		return resolve_forwarder_name( process, pid, forwarder );
	}

	struct pe_export_t
	{
		DWORD rva = 0;
		bool forwarded = false;
		char forwarder[ 256 ]{};
	};

	__forceinline bool pe_find_export_by_name( const BYTE* image, const char* export_name, pe_export_t& out )
	{
		const auto* dos = reinterpret_cast< const IMAGE_DOS_HEADER* >( image );
		if ( dos->e_magic != IMAGE_DOS_SIGNATURE )
			return false;

		const auto* nt = reinterpret_cast< const IMAGE_NT_HEADERS64* >( image + dos->e_lfanew );
		if ( nt->Signature != IMAGE_NT_SIGNATURE )
			return false;

		const auto& dir = nt->OptionalHeader.DataDirectory[ IMAGE_DIRECTORY_ENTRY_EXPORT ];
		if ( !dir.VirtualAddress || !dir.Size )
			return false;

		const auto* exports = reinterpret_cast< const IMAGE_EXPORT_DIRECTORY* >( image + dir.VirtualAddress );
		const auto* names = reinterpret_cast< const DWORD* >( image + exports->AddressOfNames );
		const auto* ords = reinterpret_cast< const WORD* >( image + exports->AddressOfNameOrdinals );
		const auto* funcs = reinterpret_cast< const DWORD* >( image + exports->AddressOfFunctions );

		for ( DWORD i = 0; i < exports->NumberOfNames; i++ )
		{
			const auto* name = reinterpret_cast< const char* >( image + names[ i ] );
			if ( strcmp( name, export_name ) != 0 )
				continue;

			const auto func_rva = funcs[ ords[ i ] ];
			if ( !func_rva )
				return false;

			if ( func_rva >= dir.VirtualAddress && func_rva < dir.VirtualAddress + dir.Size )
			{
				out.forwarded = true;
				strncpy_s( out.forwarder, reinterpret_cast< const char* >( image + func_rva ), _TRUNCATE );
				out.rva = 0;
				return true;
			}

			out.forwarded = false;
			out.rva = func_rva;
			return true;
		}

		return false;
	}

	__forceinline bool pe_find_export_by_ordinal( const BYTE* image, DWORD ordinal, pe_export_t& out )
	{
		const auto* dos = reinterpret_cast< const IMAGE_DOS_HEADER* >( image );
		if ( dos->e_magic != IMAGE_DOS_SIGNATURE )
			return false;

		const auto* nt = reinterpret_cast< const IMAGE_NT_HEADERS64* >( image + dos->e_lfanew );
		if ( nt->Signature != IMAGE_NT_SIGNATURE )
			return false;

		const auto& dir = nt->OptionalHeader.DataDirectory[ IMAGE_DIRECTORY_ENTRY_EXPORT ];
		if ( !dir.VirtualAddress || !dir.Size )
			return false;

		const auto* exports = reinterpret_cast< const IMAGE_EXPORT_DIRECTORY* >( image + dir.VirtualAddress );
		if ( ordinal < exports->Base )
			return false;

		const auto index = ordinal - exports->Base;
		if ( index >= exports->NumberOfFunctions )
			return false;

		const auto* funcs = reinterpret_cast< const DWORD* >( image + exports->AddressOfFunctions );
		const auto func_rva = funcs[ index ];
		if ( !func_rva )
			return false;

		if ( func_rva >= dir.VirtualAddress && func_rva < dir.VirtualAddress + dir.Size )
		{
			out.forwarded = true;
			strncpy_s( out.forwarder, reinterpret_cast< const char* >( image + func_rva ), _TRUNCATE );
			out.rva = 0;
			return true;
		}

		out.forwarded = false;
		out.rva = func_rva;
		return true;
	}

	__forceinline bool pe_load_file_w( const wchar_t* path, std::vector< BYTE >& out )
	{
		const auto file = CreateFileW( path, GENERIC_READ, FILE_SHARE_READ | FILE_SHARE_WRITE | FILE_SHARE_DELETE, nullptr, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, nullptr );
		if ( file == INVALID_HANDLE_VALUE )
			return false;

		const auto size = GetFileSize( file, nullptr );
		if ( size == INVALID_FILE_SIZE || !size )
		{
			CloseHandle( file );
			return false;
		}

		out.resize( size );
		DWORD read = 0;
		const auto ok = ReadFile( file, out.data( ), size, &read, nullptr ) && read == size;
		CloseHandle( file );
		return ok && out.size( ) >= sizeof( IMAGE_DOS_HEADER );
	}

	// map PE sections so export RVAs are valid (file buffer is not image layout)
	__forceinline bool pe_file_to_image( const std::vector< BYTE >& file, std::vector< BYTE >& image )
	{
		if ( file.size( ) < sizeof( IMAGE_DOS_HEADER ) )
			return false;

		const auto* dos = reinterpret_cast< const IMAGE_DOS_HEADER* >( file.data( ) );
		if ( dos->e_magic != IMAGE_DOS_SIGNATURE )
			return false;

		const auto* nt = reinterpret_cast< const IMAGE_NT_HEADERS64* >( file.data( ) + dos->e_lfanew );
		if ( nt->Signature != IMAGE_NT_SIGNATURE )
			return false;

		image.assign( nt->OptionalHeader.SizeOfImage, 0 );
		const auto header_bytes = static_cast< DWORD >( file.size( ) ) < nt->OptionalHeader.SizeOfHeaders
			? static_cast< DWORD >( file.size( ) )
			: nt->OptionalHeader.SizeOfHeaders;
		memcpy( image.data( ), file.data( ), header_bytes );

		const auto* section = IMAGE_FIRST_SECTION( nt );
		for ( WORD i = 0; i < nt->FileHeader.NumberOfSections; i++, section++ )
		{
			if ( !section->SizeOfRawData )
				continue;

			if ( section->PointerToRawData + section->SizeOfRawData > file.size( ) )
				continue;

			if ( section->VirtualAddress + section->SizeOfRawData > image.size( ) )
				continue;

			memcpy(
				image.data( ) + section->VirtualAddress,
				file.data( ) + section->PointerToRawData,
				section->SizeOfRawData );
		}

		return true;
	}

	__forceinline bool pe_export_from_path( const wchar_t* path, const char* export_name, pe_export_t& out )
	{
		std::vector< BYTE > file;
		if ( !pe_load_file_w( path, file ) )
			return false;

		std::vector< BYTE > image;
		if ( !pe_file_to_image( file, image ) )
			return false;

		return pe_find_export_by_name( image.data( ), export_name, out );
	}

	__forceinline bool pe_export_ordinal_from_path( const wchar_t* path, DWORD ordinal, pe_export_t& out )
	{
		std::vector< BYTE > file;
		if ( !pe_load_file_w( path, file ) )
			return false;

		std::vector< BYTE > image;
		if ( !pe_file_to_image( file, image ) )
			return false;

		return pe_find_export_by_ordinal( image.data( ), ordinal, out );
	}

	__forceinline void make_system32_path( const wchar_t* module_name, wchar_t* out, std::size_t out_count )
	{
		wchar_t sys[ MAX_PATH ]{};
		GetSystemDirectoryW( sys, MAX_PATH );
		swprintf_s( out, out_count, L"%s\\%s", sys, module_name );
	}

	__forceinline std::uintptr_t apply_pe_export( HANDLE process, DWORD pid, std::uintptr_t remote_base, const pe_export_t& look )
	{
		if ( look.forwarded )
			return resolve_forwarder_name( process, pid, look.forwarder );

		if ( !look.rva || !remote_base )
			return 0;

		return remote_base + look.rva;
	}

	__forceinline std::uintptr_t find_export_fallback( HANDLE process, DWORD pid, const wchar_t* module_name, const char* export_name )
	{
		const auto remote = find_module( pid, module_name );
		const auto remote_base = reinterpret_cast< std::uintptr_t >( remote.modBaseAddr );
		if ( !remote_base )
			return 0;

		pe_export_t look{};
		wchar_t sys_path[ MAX_PATH ]{};
		make_system32_path( module_name, sys_path, MAX_PATH );

		if ( pe_export_from_path( sys_path, export_name, look ) )
		{
			const auto resolved = apply_pe_export( process, pid, remote_base, look );
			if ( resolved )
				return resolved;
		}

		if ( remote.szExePath[ 0 ] && _wcsicmp( remote.szExePath, sys_path ) != 0 )
		{
			look = {};
			if ( pe_export_from_path( remote.szExePath, export_name, look ) )
			{
				const auto resolved = apply_pe_export( process, pid, remote_base, look );
				if ( resolved )
					return resolved;
			}
		}

		HMODULE local = LoadLibraryExW( module_name, nullptr, LOAD_LIBRARY_SEARCH_SYSTEM32 );
		if ( !local )
			local = LoadLibraryW( module_name );

		if ( local )
		{
			look = {};
			if ( pe_find_export_by_name( reinterpret_cast< const BYTE* >( local ), export_name, look ) )
			{
				const auto resolved = apply_pe_export( process, pid, remote_base, look );
				FreeLibrary( local );
				if ( resolved )
					return resolved;
			}
			else
			{
				FreeLibrary( local );
			}
		}

		return 0;
	}

	__forceinline std::uintptr_t find_export_ordinal_fallback( HANDLE process, DWORD pid, const wchar_t* module_name, DWORD ordinal )
	{
		const auto remote = find_module( pid, module_name );
		const auto remote_base = reinterpret_cast< std::uintptr_t >( remote.modBaseAddr );
		if ( !remote_base )
			return 0;

		pe_export_t look{};
		wchar_t sys_path[ MAX_PATH ]{};
		make_system32_path( module_name, sys_path, MAX_PATH );

		if ( pe_export_ordinal_from_path( sys_path, ordinal, look ) )
		{
			const auto resolved = apply_pe_export( process, pid, remote_base, look );
			if ( resolved )
				return resolved;
		}

		if ( remote.szExePath[ 0 ] && _wcsicmp( remote.szExePath, sys_path ) != 0 )
		{
			look = {};
			if ( pe_export_ordinal_from_path( remote.szExePath, ordinal, look ) )
			{
				const auto resolved = apply_pe_export( process, pid, remote_base, look );
				if ( resolved )
					return resolved;
			}
		}

		HMODULE local = LoadLibraryExW( module_name, nullptr, LOAD_LIBRARY_SEARCH_SYSTEM32 );
		if ( !local )
			local = LoadLibraryW( module_name );

		if ( local )
		{
			look = {};
			if ( pe_find_export_by_ordinal( reinterpret_cast< const BYTE* >( local ), ordinal, look ) )
			{
				const auto resolved = apply_pe_export( process, pid, remote_base, look );
				FreeLibrary( local );
				if ( resolved )
					return resolved;
			}
			else
			{
				FreeLibrary( local );
			}
		}

		return 0;
	}

	__forceinline std::uintptr_t find_export( HANDLE process, DWORD pid, const wchar_t* module_name, const char* export_name )
	{
		const auto module = find_module( pid, module_name );
		const auto base = reinterpret_cast< std::uintptr_t >( module.modBaseAddr );
		if ( !base )
			return 0;

		IMAGE_DOS_HEADER dos{};
		if ( !ntos->read( process, reinterpret_cast< void* >( base ), &dos, sizeof( dos ) ) )
			return 0;

		IMAGE_NT_HEADERS64 nt_hdrs{};
		if ( !ntos->read( process, reinterpret_cast< void* >( base + dos.e_lfanew ), &nt_hdrs, sizeof( nt_hdrs ) ) )
			return 0;

		const auto export_rva = nt_hdrs.OptionalHeader.DataDirectory[ IMAGE_DIRECTORY_ENTRY_EXPORT ].VirtualAddress;
		const auto export_size = nt_hdrs.OptionalHeader.DataDirectory[ IMAGE_DIRECTORY_ENTRY_EXPORT ].Size;
		if ( !export_rva )
			return 0;

		IMAGE_EXPORT_DIRECTORY exports{};
		if ( !ntos->read( process, reinterpret_cast< void* >( base + export_rva ), &exports, sizeof( exports ) ) )
			return 0;

		std::vector< DWORD > names( exports.NumberOfNames );
		std::vector< WORD > ords( exports.NumberOfNames );
		std::vector< DWORD > funcs( exports.NumberOfFunctions );

		if ( !ntos->read( process, reinterpret_cast< void* >( base + exports.AddressOfNames ), names.data( ), names.size( ) * sizeof( DWORD ) ) )
			return 0;

		if ( !ntos->read( process, reinterpret_cast< void* >( base + exports.AddressOfNameOrdinals ), ords.data( ), ords.size( ) * sizeof( WORD ) ) )
			return 0;

		if ( !ntos->read( process, reinterpret_cast< void* >( base + exports.AddressOfFunctions ), funcs.data( ), funcs.size( ) * sizeof( DWORD ) ) )
			return 0;

		char name_buf[ 256 ]{};
		for ( std::size_t i = 0; i < names.size( ); i++ )
		{
			if ( !read_remote_cstr( process, base + names[ i ], name_buf, sizeof( name_buf ) ) )
				continue;

			if ( strcmp( name_buf, export_name ) != 0 )
				continue;

			const auto func_rva = funcs[ ords[ i ] ];
			if ( !func_rva )
				return 0;

			if ( func_rva >= export_rva && func_rva < export_rva + export_size )
				return resolve_forwarder( process, pid, base + func_rva );

			return base + func_rva;
		}

		return 0;
	}

	__forceinline std::uintptr_t find_export_ordinal( HANDLE process, DWORD pid, const wchar_t* module_name, DWORD ordinal )
	{
		const auto module = find_module( pid, module_name );
		const auto base = reinterpret_cast< std::uintptr_t >( module.modBaseAddr );
		if ( !base )
			return 0;

		IMAGE_DOS_HEADER dos{};
		if ( !ntos->read( process, reinterpret_cast< void* >( base ), &dos, sizeof( dos ) ) )
			return 0;

		IMAGE_NT_HEADERS64 nt_hdrs{};
		if ( !ntos->read( process, reinterpret_cast< void* >( base + dos.e_lfanew ), &nt_hdrs, sizeof( nt_hdrs ) ) )
			return 0;

		const auto export_rva = nt_hdrs.OptionalHeader.DataDirectory[ IMAGE_DIRECTORY_ENTRY_EXPORT ].VirtualAddress;
		if ( !export_rva )
			return 0;

		IMAGE_EXPORT_DIRECTORY exports{};
		if ( !ntos->read( process, reinterpret_cast< void* >( base + export_rva ), &exports, sizeof( exports ) ) )
			return 0;

		if ( ordinal < exports.Base )
			return 0;

		const auto index = ordinal - exports.Base;
		if ( index >= exports.NumberOfFunctions )
			return 0;

		DWORD func_rva = 0;
		if ( !ntos->read( process, reinterpret_cast< void* >( base + exports.AddressOfFunctions + index * sizeof( DWORD ) ), &func_rva, sizeof( func_rva ) ) )
			return 0;

		if ( !func_rva )
			return 0;

		const auto export_size = nt_hdrs.OptionalHeader.DataDirectory[ IMAGE_DIRECTORY_ENTRY_EXPORT ].Size;
		if ( func_rva >= export_rva && func_rva < export_rva + export_size )
			return resolve_forwarder( process, pid, base + func_rva );

		return base + func_rva;
	}

	__forceinline HANDLE find_typed_handle( HANDLE process, const wchar_t* type_name, DWORD access )
	{
		DWORD buffer_size = 0x10000;
		std::vector< BYTE > buffer;
		NTSTATUS status = 0;

		do
		{
			buffer.resize( buffer_size );

			DWORD returned = 0;
			status = ntos->query_information_process(
				process,
				static_cast< PROCESSINFOCLASS >( 51 ),
				buffer.data( ),
				buffer_size,
				&returned );

			if ( status == STATUS_INFO_LENGTH_MISMATCH )
				buffer_size <<= 1;

		} while ( status == STATUS_INFO_LENGTH_MISMATCH );

		if ( !NT_SUCCESS( status ) )
			return nullptr;

		auto* snapshot = reinterpret_cast< process_handle_snapshot_t* >( buffer.data( ) );
		for ( ULONG_PTR i = 0; i < snapshot->number_of_handles; i++ )
		{
			HANDLE duplicated = nullptr;
			DuplicateHandle(
				process,
				snapshot->handles[ i ].handle_value,
				GetCurrentProcess( ),
				&duplicated,
				access,
				FALSE,
				0 );

			if ( !duplicated )
				continue;

			ULONG needed = 0;
			ntos->query_object( duplicated, ObjectTypeInformation, nullptr, 0, &needed );

			if ( !needed )
			{
				CloseHandle( duplicated );
				continue;
			}

			std::vector< BYTE > object_buf( needed );
			if ( NT_SUCCESS( ntos->query_object( duplicated, ObjectTypeInformation, object_buf.data( ), needed, &needed ) ) )
			{
				auto* type_info = reinterpret_cast< PUBLIC_OBJECT_TYPE_INFORMATION* >( object_buf.data( ) );
				if ( unicode_equals( &type_info->TypeName, type_name ) )
					return duplicated;
			}

			CloseHandle( duplicated );
		}

		return nullptr;
	}
}
