// < guard >
#include <Windows.h>
#include <cstdint>
#include <thread>
#include <iostream>

unsigned __stdcall main_thread( void* ) {
	MessageBoxA( nullptr, "hi world", "odessa", MB_OK );

	std::uintptr_t module = (std::uintptr_t) ( GetModuleHandleA( "RobloxPlayerBeta.exe" ) );
	std::uint64_t ptr = module + 0x92C340;
	using print_fn = int( _fastcall * )( int, const char *, ... );
	print_fn print = (print_fn) ( ptr );
	enum e_print {
		normal = 0,
		info = 1,
		warning = 2,
		error = 3,
	};

	for ( int i = 0; i < 55; i++ ) {
		print( e_print::normal, "hello world" );
		print( e_print::info, "hello world" );
		print( e_print::warning, "hello world" );
		print( e_print::error, "hello world" );

		print( e_print::info, "< bob >" );
	}

	return 0;
}

BOOL APIENTRY DllMain( HMODULE module, DWORD reason, void* ) {
	if ( reason == DLL_PROCESS_ATTACH ) {
		DisableThreadLibraryCalls( module );
		_beginthreadex( nullptr, 0, main_thread, nullptr, 0, 0 );
	}
	return true;
}