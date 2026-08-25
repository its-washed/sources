#pragma once
// < guard >

#include <Windows.h>
#include <cstdint>

namespace syscall
{
	inline DWORD iread = 0;
	inline DWORD iwrite = 0;
	inline DWORD iprotect = 0;
	inline DWORD iquery_system = 0;
	inline DWORD imap_view = 0;
	inline DWORD i_create_section = 0;

	inline std::uintptr_t gadget_read = 0;
	inline std::uintptr_t gadget_write = 0;
	inline std::uintptr_t gadget_protect = 0;
	inline std::uintptr_t gadget_query_system = 0;
	inline std::uintptr_t gadget_map_view = 0;
	inline std::uintptr_t gadget_create_section = 0;

	__forceinline DWORD service_index( std::uintptr_t fn )
	{
		auto* bytes = reinterpret_cast< const BYTE* >( fn );
		for ( int i = 0; i < 32; i++ )
		{
			if ( bytes[ i ] == 0xB8 )
				return *reinterpret_cast< const DWORD* >( bytes + i + 1 );
		}

		return 0;
	}

	__forceinline std::uintptr_t syscall_offset( std::uintptr_t fn )
	{
		const auto* bytes = reinterpret_cast< const BYTE* >( fn );
		for ( int i = 0; i < 256; i++ )
		{
			if ( bytes[ i ] == 0x0F && bytes[ i + 1 ] == 0x05 )
				return static_cast< std::uintptr_t >( i );
		}

		return 0;
	}

	__forceinline bool init( )
	{
		const auto ntdll = GetModuleHandleA( "ntdll.dll" );
		if ( !ntdll )
			return false;

		const auto rd = reinterpret_cast< std::uintptr_t >( GetProcAddress( ntdll, "NtReadVirtualMemory" ) );
		const auto wr = reinterpret_cast< std::uintptr_t >( GetProcAddress( ntdll, "NtWriteVirtualMemory" ) );
		const auto pr = reinterpret_cast< std::uintptr_t >( GetProcAddress( ntdll, "NtProtectVirtualMemory" ) );
		const auto qs = reinterpret_cast< std::uintptr_t >( GetProcAddress( ntdll, "NtQuerySystemInformation" ) );
		const auto mv = reinterpret_cast< std::uintptr_t >( GetProcAddress( ntdll, "NtMapViewOfSection" ) );
		const auto cs = reinterpret_cast< std::uintptr_t >( GetProcAddress( ntdll, "NtCreateSection" ) );

		if ( !rd || !wr || !pr || !qs || !mv || !cs )
			return false;

		iread = service_index( rd );
		iwrite = service_index( wr );
		iprotect = service_index( pr );
		iquery_system = service_index( qs );
		imap_view = service_index( mv );
		i_create_section = service_index( cs );

		gadget_read = rd + syscall_offset( rd );
		gadget_write = wr + syscall_offset( wr );
		gadget_protect = pr + syscall_offset( pr );
		gadget_query_system = qs + syscall_offset( qs );
		gadget_map_view = mv + syscall_offset( mv );
		gadget_create_section = cs + syscall_offset( cs );

		return iread && iwrite && iprotect && iquery_system && imap_view && i_create_section && gadget_read && gadget_write && gadget_protect && 
			gadget_query_system && gadget_map_view && gadget_create_section;
	}
}
