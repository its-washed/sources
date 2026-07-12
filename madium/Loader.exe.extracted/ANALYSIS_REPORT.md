# Loader.exe Analysis Report

## Overview

Loader.exe is packed with **VMProtect** (detected by RetDec).

VMProtect virtualizes code, making static decompilation impossible.
The binary must be run on Windows and dumped from memory to recover
the original code.

## Sections

| Section | Virtual Size | Raw Size | Entropy | Notes |
|---------|-------------|----------|---------|-------|
| .text | 0x29d43 | 0x0 | 0.00 | Virtual (filled at runtime) |
| .rdata | 0x6bec | 0x0 | 0.00 | Virtual (filled at runtime) |
| .data | 0xc98 | 0x0 | 0.00 | Virtual (filled at runtime) |
| .pdata | 0xd08 | 0x0 | 0.00 | Virtual (filled at runtime) |
| ._mdm0 | 0x6bd957 | 0x0 | 0.00 | Virtual (filled at runtime) |
| ._mdm1 | 0xc40 | 0xe00 | 0.23 |  |
| ._mdm2 | 0xb781ec | 0xb78200 | 7.82 | Encrypted/compressed |
| .rsrc | 0x1d5 | 0x200 | 4.73 |  |

## Imports

The import table reveals the binary's functionality:

- `LoadLibraryA` / `GetProcAddress` — Dynamic DLL loading
- `FindWindowA` — Finding window by title (likely Roblox)
- `OpenProcessToken` — Process token manipulation
- `IsWow64Process` — 32/64-bit detection
- `HeapAlloc` / `HeapFree` — Memory allocation
- `ExitProcess` — Process termination
- `GetSystemTimeAsFileTime` — Time check (anti-debug)

## Strings

- Total ASCII strings: 17157
- URLs: 0
- DLL names: 15
- API calls: 2

## VMProtect Unpacking

To unpack Loader.exe:

1. Run on Windows VM with x64dbg
2. Set breakpoint on `GetModuleHandleA` (called after unpacking)
3. Dump the process memory using Scylla
4. Fix the IAT (Import Address Table)
5. Use NoVmp to devirtualize VMProtect-protected functions

Alternatively, use NoVmp directly (requires the binary to be
already dumped from memory).
