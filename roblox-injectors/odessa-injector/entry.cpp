// < guard >
#include <iostream>
#include <memory>
#include <string>

#include <core/native/native.hpp>
#include <core/syscall/syscall.hpp>
#include <core/process/process.hpp>
#include <core/pe/pe.hpp>
#include <core/stomper/stomper.hpp>
#include <core/mapper/mapper.hpp>

__forceinline void fail( const char* message )
{
	std::cout << "[;-;] " << message << "\n";
	std::cout << "[;-;] press enter to exit\n";
	std::cin.get( );
}

__forceinline std::string exe_directory( )
{
	char path[ MAX_PATH ]{};
	GetModuleFileNameA( nullptr, path, MAX_PATH );

	std::string full = path;
	const auto slash = full.find_last_of( "\\/" );

	if ( slash == std::string::npos )
		return {};

	return full.substr( 0, slash + 1 );
}

std::int32_t main( )
{
	const auto dll_path = exe_directory( ) + "odessa.dll";
	std::cout << "[;-;] dll -> " << dll_path << "\n";

	native::init( );

	if ( !ntos->init( ) )
	{
		fail( "ntos init failed" );
		return 1;
	}

	if ( !syscall::init( ) )
	{
		fail( "syscall init failed" );
		return 1;
	}

	auto* info = process::find_by_name( L"RobloxPlayerBeta.exe" );
	if ( !info )
	{
		fail( "roblox is not running" );
		return 1;
	}

	process::session::pid = static_cast< DWORD >( reinterpret_cast< ULONG_PTR >( info->UniqueProcessId ) );
	process::session::handle = OpenProcess( PROCESS_ALL_ACCESS, FALSE, process::session::pid );

	if ( !process::session::handle || process::session::handle == INVALID_HANDLE_VALUE )
	{
		fail( "OpenProcess failed (run as admin)" );
		return 1;
	}

	std::cout << "[;-;] opened pid " << process::session::pid << "\n";

	const auto local_image = pe::load_file( dll_path.c_str( ) );
	if ( !local_image )
	{
		fail( "failed to read odessa.dll (must sit next to odessa.exe)" );
		return 1;
	}

	const auto image_size = pe::headers( local_image )->OptionalHeader.SizeOfImage;
	std::cout << "[;-;] image size -> 0x" << std::hex << image_size << std::dec << "\n";

	const auto reservation = stomper->reserve( process::session::handle, process::session::pid, image_size );
	if ( !reservation.base )
	{
		std::cout << "[;-;] last stage -> " << stomper->last_stage
			<< " status=0x" << std::hex << static_cast< unsigned long >( stomper->last_status )
			<< " gle=" << std::dec << stomper->last_error << "\n";
		fail( "stomp reserve failed" );
		return 1;
	}

	std::cout << "[;-;] stomp base -> 0x" << std::hex << reservation.base << std::dec << "\n";

	MODULEENTRY32W host{};
	for ( int i = 0; i < 60; i++ )
	{
		Sleep( 50 );

		host = process::find_module( process::session::pid, L"RobloxPlayerBeta.dll" );
		if ( host.modBaseAddr )
			break;
	}

	if ( !host.modBaseAddr )
	{
		fail( "RobloxPlayerBeta.dll not found" );
		return 1;
	}

	mapper->init(
		process::session::pid,
		process::session::handle,
		reinterpret_cast< std::uintptr_t >( host.modBaseAddr ),
		reservation.base,
		reservation.size );

	if ( !mapper->map( dll_path, reservation.base ) )
	{
		fail( "map failed" );
		return 1;
	}

	std::cout << "[;-;] mapped\n";
	std::cout << "[;-;] press enter to exit\n";
	std::cin.get( );
	return 0;
}
