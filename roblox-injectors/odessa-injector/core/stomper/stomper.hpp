#pragma once
// < guard >

#include <Windows.h>
#include <TlHelp32.h>
#include <winternl.h>
#include <cstdint>
#include <cstring>
#include <iostream>
#include <memory>
#include <string>

#include <core/native/native.hpp>

class c_stomper
{
public:
	struct reservation_t
	{
		std::uintptr_t base = 0;
		std::uintptr_t size = 0;
	};

	NTSTATUS last_status = 0;
	DWORD last_error = 0;
	char last_stage[ 64 ]{};

	__forceinline void set_fail( const char* stage, NTSTATUS status = 0, DWORD win32_error = 0 )
	{
		strncpy_s( this->last_stage, stage, _TRUNCATE );
		this->last_status = status;
		this->last_error = win32_error;
	}

	__forceinline std::wstring system_dir( )
	{
		wchar_t buffer[ MAX_PATH ]{};
		const auto length = GetSystemDirectoryW( buffer, MAX_PATH );
		if ( !length || length >= MAX_PATH )
			return L"C:\\Windows\\System32";

		return buffer;
	}

	__forceinline std::uintptr_t map_image( const wchar_t* path, HANDLE process )
	{
		std::wcout << L"[;-;] open decoy -> " << path << L"\n";

		const auto attrs = GetFileAttributesW( path );
		if ( attrs == INVALID_FILE_ATTRIBUTES )
		{
			this->set_fail( "GetFileAttributesW", 0, GetLastError( ) );
			return 0;
		}

		const auto file = CreateFileW(
			path,
			GENERIC_READ,
			FILE_SHARE_READ | FILE_SHARE_WRITE | FILE_SHARE_DELETE,
			nullptr,
			OPEN_EXISTING,
			FILE_ATTRIBUTE_NORMAL,
			nullptr );

		if ( file == INVALID_HANDLE_VALUE )
		{
			this->set_fail( "CreateFileW", 0, GetLastError( ) );
			return 0;
		}

		BYTE header[ 4096 ]{};
		DWORD read = 0;

		if ( !ReadFile( file, header, sizeof( header ), &read, nullptr ) )
		{
			this->set_fail( "ReadFile", 0, GetLastError( ) );
			CloseHandle( file );
			return 0;
		}

		auto* dos = reinterpret_cast< IMAGE_DOS_HEADER* >( header );
		auto* nt_hdrs = reinterpret_cast< IMAGE_NT_HEADERS64* >( header + dos->e_lfanew );

		if ( dos->e_magic != IMAGE_DOS_SIGNATURE || nt_hdrs->Signature != IMAGE_NT_SIGNATURE )
		{
			this->set_fail( "bad pe", 0, 0 );
			CloseHandle( file );
			return 0;
		}

		if ( nt_hdrs->FileHeader.Machine != IMAGE_FILE_MACHINE_AMD64 )
		{
			this->set_fail( "not x64 image", 0, 0 );
			CloseHandle( file );
			return 0;
		}

		HANDLE section = nullptr;
		auto status = ntos->create_section(
			&section,
			SECTION_MAP_READ | SECTION_MAP_EXECUTE | SECTION_QUERY,
			nullptr,
			nullptr,
			PAGE_READONLY,
			SEC_IMAGE,
			file );

		CloseHandle( file );

		if ( !NT_SUCCESS( status ) || !section )
		{
			this->set_fail( "NtCreateSection", status, 0 );
			return 0;
		}

		PVOID view = nullptr;
		SIZE_T view_size = 0;

		status = ntos->map_view_of_section(
			section,
			process,
			&view,
			0,
			0,
			nullptr,
			&view_size,
			2, // ViewUnmap
			0,
			PAGE_READONLY );

		ntos->close( section );

		if ( !NT_SUCCESS( status ) || !view )
		{
			this->set_fail( "NtMapViewOfSection", status, 0 );
			return 0;
		}

		this->set_fail( "ok", status, 0 );
		return reinterpret_cast< std::uintptr_t >( view );
	}

	__forceinline void unmap( HANDLE process, void* base )
	{
		if ( ntos->unmap_view_of_section )
			ntos->unmap_view_of_section( process, base );
	}

	__forceinline bool is_skip_module( const wchar_t* name )
	{
		static const wchar_t* skip[] = {
			L"RobloxPlayerBeta.exe",
			L"RobloxPlayerBeta.dll",
			L"ntdll.dll",
			L"kernel32.dll",
			L"kernelbase.dll",
			L"user32.dll",
			L"gdi32.dll",
			L"gdi32full.dll",
			L"win32u.dll",
			L"ucrtbase.dll",
			L"msvcrt.dll",
			L"msvcp_win.dll",
			L"advapi32.dll",
			L"sechost.dll",
			L"rpcrt4.dll",
			L"bcryptprimitives.dll",
			L"cryptbase.dll",
			L"sspicli.dll",
			L"imm32.dll",
			L"psapi.dll",
			L"SHCore.dll",
			L"combase.dll",
			L"ole32.dll",
			L"shell32.dll",
			L"WinTypes.dll",
			nullptr
		};

		for ( int i = 0; skip[ i ]; i++ )
		{
			if ( _wcsicmp( name, skip[ i ] ) == 0 )
				return true;
		}

		return false;
	}

	__forceinline reservation_t reserve_existing( DWORD pid, std::uintptr_t image_size )
	{
		const auto needed = image_size + 0x3000;

		MODULEENTRY32W entry{};
		entry.dwSize = sizeof( MODULEENTRY32W );

		const auto snapshot = CreateToolhelp32Snapshot( TH32CS_SNAPMODULE | TH32CS_SNAPMODULE32, pid );
		if ( snapshot == INVALID_HANDLE_VALUE )
		{
			this->set_fail( "CreateToolhelp32Snapshot", 0, GetLastError( ) );
			return {};
		}

		reservation_t best{};
		wchar_t best_name[ MAX_MODULE_NAME32 + 1 ]{};

		if ( Module32FirstW( snapshot, &entry ) )
		{
			do
			{
				if ( this->is_skip_module( entry.szModule ) )
					continue;

				if ( entry.modBaseSize < needed )
					continue;

				if ( entry.modBaseSize > best.size )
				{
					best.base = reinterpret_cast< std::uintptr_t >( entry.modBaseAddr );
					best.size = entry.modBaseSize;
					wcsncpy_s( best_name, entry.szModule, _TRUNCATE );

					std::wcout << L"[;-;] fallback candidate -> " << entry.szModule
						<< L" size=0x" << std::hex << entry.modBaseSize << std::dec << L"\n";
				}
			} while ( Module32NextW( snapshot, &entry ) );
		}

		CloseHandle( snapshot );

		if ( !best.base )
		{
			this->set_fail( "no existing module large enough", 0, 0 );
			return {};
		}

		std::wcout << L"[;-;] using existing module -> " << best_name
			<< L" @ 0x" << std::hex << best.base << L" size=0x" << best.size << std::dec << L"\n";

		this->set_fail( "existing module", 0, 0 );
		return best;
	}

	__forceinline reservation_t reserve( HANDLE process, DWORD pid, std::uintptr_t image_size )
	{
		const auto root = this->system_dir( );
		std::wcout << L"[;-;] system dir -> " << root << L"\n";

		static const wchar_t* decoy_names[] = {
			L"shell32.dll",
			L"SetupAPI.dll",
			L"ole32.dll",
			L"combase.dll",
			L"d2d1.dll",
			L"windows.storage.dll",
			L"mshtml.dll",
			nullptr
		};

		for ( int i = 0; decoy_names[ i ]; i++ )
		{
			const auto path = root + L"\\" + decoy_names[ i ];
			const auto base = this->map_image( path.c_str( ), process );
			if ( !base )
			{
				std::cout << "[;-;] " << this->last_stage
					<< " status=0x" << std::hex << static_cast< unsigned long >( this->last_status )
					<< " gle=" << std::dec << this->last_error << "\n";
				continue;
			}

			IMAGE_DOS_HEADER dos{};
			IMAGE_NT_HEADERS64 nt_hdrs{};

			if ( !ntos->read( process, reinterpret_cast< void* >( base ), &dos, sizeof( dos ) )
				|| !ntos->read( process, reinterpret_cast< void* >( base + dos.e_lfanew ), &nt_hdrs, sizeof( nt_hdrs ) ) )
			{
				this->set_fail( "remote pe read", 0, 0 );
				this->unmap( process, reinterpret_cast< void* >( base ) );
				std::cout << "[;-;] mapped but remote read failed\n";
				continue;
			}

			const auto mapped_size = static_cast< std::uintptr_t >( nt_hdrs.OptionalHeader.SizeOfImage );
			if ( mapped_size < image_size + 0x3000 )
			{
				this->set_fail( "decoy too small", 0, 0 );
				this->unmap( process, reinterpret_cast< void* >( base ) );
				std::cout << "[;-;] decoy too small (0x" << std::hex << mapped_size << std::dec << ")\n";
				continue;
			}

			std::cout << "[;-;] decoy mapped @ 0x" << std::hex << base << " size=0x" << mapped_size << std::dec << "\n";
			return { base, mapped_size };
		}

		std::cout << "[;-;] section map unavailable - falling back to existing module stomp\n";
		return this->reserve_existing( pid, image_size );
	}
};

inline std::shared_ptr< c_stomper > stomper = std::make_shared< c_stomper >( );
