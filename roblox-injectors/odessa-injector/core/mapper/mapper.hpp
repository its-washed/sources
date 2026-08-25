#pragma once
// < guard >

#include <Windows.h>
#include <cstdint>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <memory>
#include <string>
#include <vector>

#include <core/native/native.hpp>
#include <core/pe/pe.hpp>
#include <core/process/process.hpp>

struct tp_task_callbacks_t
{
	PVOID execute_callback;
	PVOID unposted;
};

struct tp_task_t
{
	tp_task_callbacks_t* callbacks;
	UINT32 numa_node;
	UINT8 ideal_processor;
	UINT8 padding[ 3 ];
	LIST_ENTRY list_entry;
};

struct tp_direct_t
{
	tp_task_t task;
	UINT64 lock;
	LIST_ENTRY io;
	void* callback;
	UINT32 numa;
	UINT8 ideal;
	char pad[ 3 ];
};

class mapper_t
{
private:
	std::int32_t pid = 0;
	HANDLE process = nullptr;
	std::uintptr_t host_base = 0;
	std::uintptr_t stomp_base = 0;
	std::uintptr_t stomp_size = 0;
	std::uintptr_t stub_base = 0;
	std::uintptr_t tail_off = 0;
	std::uintptr_t tail_end = 0;
	HANDLE io_completion = nullptr;

	__forceinline std::uintptr_t alloc_tail( SIZE_T size, SIZE_T align )
	{
		this->tail_off = ( this->tail_off + align - 1 ) & ~( align - 1 );
		if ( this->tail_off + size > this->tail_end )
			return 0;

		const auto address = this->tail_off;
		this->tail_off += size;
		return address;
	}

	__forceinline void execute_stub( const BYTE* shellcode, SIZE_T size )
	{
		if ( !this->io_completion )
		{
			this->io_completion = process::find_typed_handle( this->process, L"IoCompletion", IO_COMPLETION_ALL_ACCESS );
			if ( !this->io_completion )
				return;
		}

		const auto code_slot = this->alloc_tail( size, 0x1000 );
		if ( !code_slot )
			return;

		PVOID region = reinterpret_cast< void* >( code_slot );
		SIZE_T region_size = size;
		DWORD old = 0;

		ntos->protect_memory( this->process, &region, &region_size, PAGE_READWRITE, &old );

		if ( !ntos->write( this->process, reinterpret_cast< void* >( code_slot ), shellcode, size ) )
			return;

		ntos->protect_memory( this->process, &region, &region_size, PAGE_EXECUTE_READ, &old );

		tp_direct_t direct{};
		direct.callback = reinterpret_cast< void* >( code_slot );

		const auto data_slot = this->alloc_tail( sizeof( tp_direct_t ), 0x1000 );
		if ( !data_slot )
			return;

		PVOID data_region = reinterpret_cast< void* >( data_slot );
		SIZE_T data_size = sizeof( tp_direct_t );

		ntos->protect_memory( this->process, &data_region, &data_size, PAGE_READWRITE, &old );

		if ( !ntos->write( this->process, reinterpret_cast< void* >( data_slot ), &direct, sizeof( tp_direct_t ) ) )
			return;

		if ( !ntos->set_io_completion )
			return;

		ntos->set_io_completion( this->io_completion, reinterpret_cast< void* >( data_slot ), nullptr, nullptr, 0 );
	}

public:
	__forceinline void init( std::int32_t pid, HANDLE process, std::uintptr_t host_base, std::uintptr_t stomp_base, std::uintptr_t stomp_size = 0 )
	{
		this->pid = pid;
		this->process = process;
		this->host_base = host_base;
		this->stomp_base = stomp_base;
		this->stomp_size = stomp_size;
		this->stub_base = 0;
		this->tail_off = 0;
		this->tail_end = 0;
		this->io_completion = nullptr;
	}

	__forceinline bool map( const std::string& path, std::uintptr_t remote_base )
	{
		if ( !remote_base )
			return false;

		FILE* file = nullptr;
		if ( fopen_s( &file, path.c_str( ), "rb" ) != 0 || !file )
			return false;

		fseek( file, 0, SEEK_END );
		const auto file_size = static_cast< std::size_t >( ftell( file ) );
		rewind( file );

		auto raw = std::make_unique< BYTE[] >( file_size );
		if ( fread( raw.get( ), 1, file_size, file ) != file_size )
		{
			fclose( file );
			return false;
		}

		fclose( file );

		auto* dos = reinterpret_cast< IMAGE_DOS_HEADER* >( raw.get( ) );
		auto* nt_hdrs = reinterpret_cast< IMAGE_NT_HEADERS* >( raw.get( ) + dos->e_lfanew );
		const auto image_size = nt_hdrs->OptionalHeader.SizeOfImage;

		auto mapped = std::make_unique< BYTE[] >( image_size );
		memset( mapped.get( ), 0, image_size );
		memcpy( mapped.get( ), raw.get( ), nt_hdrs->OptionalHeader.SizeOfHeaders );

		auto* sections = IMAGE_FIRST_SECTION( nt_hdrs );
		for ( WORD i = 0; i < nt_hdrs->FileHeader.NumberOfSections; i++ )
		{
			if ( !sections[ i ].SizeOfRawData )
				continue;

			memcpy(
				mapped.get( ) + sections[ i ].VirtualAddress,
				raw.get( ) + sections[ i ].PointerToRawData,
				sections[ i ].SizeOfRawData );
		}

		auto* mapped_dos = reinterpret_cast< IMAGE_DOS_HEADER* >( mapped.get( ) );
		auto* mapped_nt = reinterpret_cast< IMAGE_NT_HEADERS* >( mapped.get( ) + mapped_dos->e_lfanew );

		const auto delta = static_cast< std::int64_t >( remote_base ) - static_cast< std::int64_t >( mapped_nt->OptionalHeader.ImageBase );
		pe::apply_relocations( mapped.get( ), mapped_nt, delta );
		mapped_nt->OptionalHeader.ImageBase = remote_base;

		if ( !pe::apply_imports( mapped.get( ), mapped_nt, this->process, static_cast< DWORD >( this->pid ) ) )
		{
			std::cout << "[;-;] remote import resolve failed\n";
			return false;
		}

		this->stub_base = remote_base + image_size;
		this->tail_off = this->stub_base;
		this->tail_end = remote_base + this->stomp_size;

		if ( this->tail_end <= this->stub_base )
			return false;

		{
			PVOID write_base = reinterpret_cast< void* >( remote_base );
			SIZE_T write_size = image_size;
			DWORD old = 0;

			ntos->protect_memory( this->process, &write_base, &write_size, PAGE_READWRITE, &old );
		}

		std::size_t written = 0;
		if ( !ntos->write( this->process, reinterpret_cast< void* >( remote_base ), mapped.get( ), image_size, &written ) || written != image_size )
			return false;

		sections = IMAGE_FIRST_SECTION( nt_hdrs );
		for ( WORD i = 0; i < nt_hdrs->FileHeader.NumberOfSections; i++ )
		{
			if ( !sections[ i ].Misc.VirtualSize )
				continue;

			PVOID section_base = reinterpret_cast< void* >( remote_base + sections[ i ].VirtualAddress );
			SIZE_T section_size = sections[ i ].Misc.VirtualSize;
			const auto chars = sections[ i ].Characteristics;

			DWORD protect = PAGE_READONLY;
			if ( chars & IMAGE_SCN_MEM_EXECUTE )
				protect = PAGE_EXECUTE_READ;
			else if ( chars & IMAGE_SCN_MEM_WRITE )
				protect = PAGE_READWRITE;

			DWORD old = 0;
			ntos->protect_memory( this->process, &section_base, &section_size, protect, &old );
		}

		auto& ex_dir = mapped_nt->OptionalHeader.DataDirectory[ IMAGE_DIRECTORY_ENTRY_EXCEPTION ];
		if ( ex_dir.VirtualAddress )
		{
			uintptr_t table_addr = remote_base + ex_dir.VirtualAddress;
			uintptr_t count = ex_dir.Size / 12;

			// MUST be remote ntdll — stub runs inside the target
			const auto add_function_table = process::find_export(
				this->process,
				static_cast< DWORD >( this->pid ),
				L"ntdll.dll",
				"RtlAddFunctionTable" );

			if ( add_function_table )
			{
				BYTE sc_seh[] = {
					0x48, 0x83, 0xEC, 0x28,
					0x48, 0xB9, 0, 0, 0, 0, 0, 0, 0, 0,
					0x48, 0xBA, 0, 0, 0, 0, 0, 0, 0, 0,
					0x49, 0xB8, 0, 0, 0, 0, 0, 0, 0, 0,
					0x48, 0xB8, 0, 0, 0, 0, 0, 0, 0, 0,
					0xFF, 0xD0,
					0x48, 0x83, 0xC4, 0x28,
					0xC3
				};

				memcpy( &sc_seh[ 6 ], &table_addr, 8 );
				memcpy( &sc_seh[ 16 ], &count, 8 );
				memcpy( &sc_seh[ 26 ], &remote_base, 8 );
				memcpy( &sc_seh[ 36 ], &add_function_table, 8 );

				this->execute_stub( sc_seh, sizeof( sc_seh ) );
			}
		}

		auto& tls_dir = mapped_nt->OptionalHeader.DataDirectory[ IMAGE_DIRECTORY_ENTRY_TLS ];
		if ( tls_dir.VirtualAddress )
		{
			auto* tls = reinterpret_cast< PIMAGE_TLS_DIRECTORY64 >( mapped.get( ) + tls_dir.VirtualAddress );
			if ( tls->AddressOfCallBacks )
			{
				const auto cb_array_rva = static_cast< std::uintptr_t >( tls->AddressOfCallBacks ) - remote_base;
				auto* callbacks = reinterpret_cast< std::uintptr_t* >( mapped.get( ) + cb_array_rva );

				for ( int i = 0; callbacks[ i ] != 0; i++ )
				{
					BYTE sc_tls[] = {
						0x48, 0x83, 0xEC, 0x28,
						0x48, 0xB9, 0, 0, 0, 0, 0, 0, 0, 0,
						0x48, 0xC7, 0xC2, 0x01, 0x00, 0x00, 0x00,
						0x4D, 0x31, 0xC0,
						0x48, 0xB8, 0, 0, 0, 0, 0, 0, 0, 0,
						0xFF, 0xD0,
						0x48, 0x83, 0xC4, 0x28,
						0xC3
					};

					uintptr_t cb_addr = callbacks[ i ];
					memcpy( &sc_tls[ 6 ], &remote_base, 8 );
					memcpy( &sc_tls[ 26 ], &cb_addr, 8 );

					this->execute_stub( sc_tls, sizeof( sc_tls ) );
				}
			}
		}

		if ( nt_hdrs->OptionalHeader.AddressOfEntryPoint )
		{
			uint64_t entry_va = remote_base + nt_hdrs->OptionalHeader.AddressOfEntryPoint;
			uintptr_t base_val = remote_base;

			BYTE sc[] = {
				0x48, 0x83, 0xEC, 0x28,
				0x48, 0xB9, 0, 0, 0, 0, 0, 0, 0, 0,
				0x48, 0xC7, 0xC2, 0x01, 0x00, 0x00, 0x00,
				0x4D, 0x31, 0xC0,
				0x48, 0xB8, 0, 0, 0, 0, 0, 0, 0, 0,
				0xFF, 0xD0,
				0x48, 0x83, 0xC4, 0x28,
				0xC3
			};

			memcpy( &sc[ 6 ], &base_val, sizeof( base_val ) );
			memcpy( &sc[ 26 ], &entry_va, sizeof( entry_va ) );

			this->execute_stub( sc, sizeof( sc ) );
		}

		if ( this->io_completion )
		{
			CloseHandle( this->io_completion );
			this->io_completion = nullptr;
		}

		return true;
	}
};

inline std::shared_ptr< mapper_t > mapper = std::make_shared< mapper_t >( );
