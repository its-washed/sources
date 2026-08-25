#pragma once
// < guard >
#include <Windows.h>
#include <winternl.h>
#include <cstddef>
#include <cstdint>
#include <memory>
#include <string>

#ifndef NT_SUCCESS
#define NT_SUCCESS( Status ) ( ( ( NTSTATUS )( Status ) ) >= 0 )
#endif

#ifndef STATUS_INFO_LENGTH_MISMATCH
#define STATUS_INFO_LENGTH_MISMATCH ( ( NTSTATUS )0xC0000004L )
#endif

namespace native
{
	inline HMODULE ntdll = nullptr;

	__forceinline void init( )
	{
		ntdll = GetModuleHandleA( "ntdll.dll" );
	}

	template < typename type >
	__forceinline type resolve( const char* name )
	{
		return reinterpret_cast< type >( GetProcAddress( ntdll, name ) );
	}
}

struct process_handle_table_entry_t
{
	HANDLE handle_value;
	ULONG_PTR name_pointer;
	ULONG_PTR type_pointer;
	ULONG handle_attributes;
	ULONG granted_access;
	ULONG_PTR object;
};

struct process_handle_snapshot_t
{
	ULONG_PTR number_of_handles;
	ULONG_PTR reserved;
	process_handle_table_entry_t handles[ 1 ];
};

class ntos_t
{
public:
	using read_virtual_memory_t = NTSTATUS( NTAPI* )( HANDLE, PVOID, PVOID, SIZE_T, PSIZE_T );
	using write_virtual_memory_t = NTSTATUS( NTAPI* )( HANDLE, PVOID, PVOID, SIZE_T, PSIZE_T );
	using protect_virtual_memory_t = NTSTATUS( NTAPI* )( HANDLE, PVOID*, PSIZE_T, ULONG, PULONG );
	using query_system_information_t = NTSTATUS( NTAPI* )( SYSTEM_INFORMATION_CLASS, PVOID, ULONG, PULONG );
	using create_section_t = NTSTATUS( NTAPI* )( PHANDLE, ACCESS_MASK, POBJECT_ATTRIBUTES, PLARGE_INTEGER, ULONG, ULONG, HANDLE );
	using map_view_of_section_t = NTSTATUS( NTAPI* )( HANDLE, HANDLE, PVOID*, ULONG_PTR, SIZE_T, PLARGE_INTEGER, PSIZE_T, ULONG, ULONG, ULONG );
	using unmap_view_of_section_t = NTSTATUS( NTAPI* )( HANDLE, PVOID );
	using query_information_process_t = NTSTATUS( NTAPI* )( HANDLE, PROCESSINFOCLASS, PVOID, ULONG, PULONG );
	using query_object_t = NTSTATUS( NTAPI* )( HANDLE, OBJECT_INFORMATION_CLASS, PVOID, ULONG, PULONG );
	using close_t = NTSTATUS( NTAPI* )( HANDLE );
	using set_io_completion_t = NTSTATUS( NTAPI* )( HANDLE, PVOID, PVOID, PVOID, ULONG );

	read_virtual_memory_t read_memory = nullptr;
	write_virtual_memory_t write_memory = nullptr;
	protect_virtual_memory_t protect_memory = nullptr;
	query_system_information_t query_system_information = nullptr;
	create_section_t create_section = nullptr;
	map_view_of_section_t map_view_of_section = nullptr;
	unmap_view_of_section_t unmap_view_of_section = nullptr;
	query_information_process_t query_information_process = nullptr;
	query_object_t query_object = nullptr;
	close_t close = nullptr;
	set_io_completion_t set_io_completion = nullptr;

	__forceinline bool init( )
	{
		this->read_memory = native::resolve< read_virtual_memory_t >( "NtReadVirtualMemory" );
		this->write_memory = native::resolve< write_virtual_memory_t >( "NtWriteVirtualMemory" );
		this->protect_memory = native::resolve< protect_virtual_memory_t >( "NtProtectVirtualMemory" );
		this->query_system_information = native::resolve< query_system_information_t >( "NtQuerySystemInformation" );
		this->create_section = native::resolve< create_section_t >( "NtCreateSection" );
		this->map_view_of_section = native::resolve< map_view_of_section_t >( "NtMapViewOfSection" );
		this->unmap_view_of_section = native::resolve< unmap_view_of_section_t >( "NtUnmapViewOfSection" );
		this->query_information_process = native::resolve< query_information_process_t >( "NtQueryInformationProcess" );
		this->query_object = native::resolve< query_object_t >( "NtQueryObject" );
		this->close = native::resolve< close_t >( "NtClose" );
		this->set_io_completion = native::resolve< set_io_completion_t >( "ZwSetIoCompletion" );

		return this->read_memory
			&& this->write_memory
			&& this->protect_memory
			&& this->query_system_information
			&& this->create_section
			&& this->map_view_of_section
			&& this->unmap_view_of_section
			&& this->query_information_process
			&& this->query_object
			&& this->close
			&& this->set_io_completion;
	}

	__forceinline bool read( HANDLE process, void* address, void* buffer, std::size_t size, std::size_t* transferred = nullptr )
	{
		std::size_t n = 0;
		const auto status = this->read_memory( process, address, buffer, size, &n );

		if ( transferred )
			*transferred = n;

		return NT_SUCCESS( status ) && n == size;
	}

	__forceinline bool write( HANDLE process, void* address, const void* buffer, std::size_t size, std::size_t* transferred = nullptr )
	{
		std::size_t n = 0;
		const auto status = this->write_memory( process, address, const_cast< void* >( buffer ), size, &n );

		if ( transferred )
			*transferred = n;

		return NT_SUCCESS( status ) && n == size;
	}

	__forceinline bool protect( HANDLE process, void* address, std::size_t size, ULONG new_protect, ULONG* old_protect = nullptr )
	{
		PVOID base = address;
		SIZE_T region = size;
		ULONG previous = 0;

		const auto status = this->protect_memory( process, &base, &region, new_protect, &previous );

		if ( old_protect )
			*old_protect = previous;

		return NT_SUCCESS( status );
	}

	template < typename T >
	__forceinline T read( HANDLE process, std::uintptr_t address )
	{
		T value{};
		if ( !this->read( process, reinterpret_cast< void* >( address ), &value, sizeof( T ) ) )
			return {};

		return value;
	}

	template < typename T >
	__forceinline bool write( HANDLE process, std::uintptr_t address, const T& value )
	{
		return this->write( process, reinterpret_cast< void* >( address ), &value, sizeof( T ) );
	}
};

inline std::shared_ptr< ntos_t > ntos = std::make_shared< ntos_t >( );
