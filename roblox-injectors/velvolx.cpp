// for version version-76173e47a79145c7
#define WIN32_LEAN_AND_MEAN
#define NOMINMAX
#define _CRT_SECURE_NO_WARNINGS
#define UMDF_USING_NTSTATUS
#include <windows.h>
#include <tlhelp32.h>
#include <psapi.h>
#include <winternl.h>
#include <ntstatus.h>
#include <wincrypt.h>
#include <shlwapi.h>
#include <shellapi.h>
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include <vector>
#include <string>
#include <random>

#pragma comment(lib, "ntdll.lib")
#pragma comment(lib, "psapi.lib")
#pragma comment(lib, "advapi32.lib")
#pragma comment(lib, "shlwapi.lib")
#pragma comment(lib, "shell32.lib")

typedef LONG NTSTATUS;
typedef NTSTATUS (WINAPI *pfnNtUnmapViewOfSection)(HANDLE, PVOID);
typedef NTSTATUS (WINAPI *pfnNtSetIoCompletion)(HANDLE, ULONG_PTR, ULONG_PTR, NTSTATUS, ULONG_PTR);
typedef NTSTATUS (WINAPI *pfnNtQueryInformationProcess)(HANDLE, ULONG, PVOID, ULONG, PULONG);
typedef NTSTATUS (WINAPI *pfnNtQueryObject)(HANDLE, ULONG, PVOID, ULONG, PULONG);

static pfnNtUnmapViewOfSection      g_NtUnmap  = nullptr;
static pfnNtSetIoCompletion         g_NtSetIo  = nullptr;
static pfnNtQueryInformationProcess g_NtQIP    = nullptr;
static pfnNtQueryObject             g_NtQObj   = nullptr;

static const uint64_t patcha[] = {
    0xbdae04, 0xbdcad8, 0xbde361, 0xbe7236, 0xbe2ebe, 0xbe9219,
    0xc13d9f, 0xc256eb, 0xbdf1f5, 0xbe382c, 0xbe597e, 0xc32faa,
    0xc39109, 0x13c8d45, 0x148585c, 0x458c00, 0x861b0a, 0x9032d3,
    0x130be86, 0x13b16e2, 0x1409a3c, 0xc9d3cb, 0xbe5dd6, 0xbdd89d,
    0xc06257, 0xcf9c9f, 0xd0ae01, 0xcd14de, 0xbdff14, 0xc85779,
    0xbdbad1
};
static const int patcha_c = sizeof(patcha) / sizeof(patcha[0]);

static const uint64_t patchb[] = {
    0xbe420c, 0xbe9af8, 0xc06e15, 0xc096aa, 0xc27da0, 0xc923d0,
    0xcfa53e, 0xd67015, 0xbe7bc5, 0xd8b190, 0xd8a600, 0xc172a3,
    0xbe6b2f
};
static const int patchb_c = sizeof(patchb) / sizeof(patchb[0]);

struct specificpatch { uint64_t rva; int len; uint8_t bytes[12]; };
static const specificpatch loopn1[] = {
    { 0x1479f81, 1,  { 0xcc } },
    { 0xc26522,  6,  { 0x90, 0x90, 0x90, 0x90, 0x90, 0x90 } },
    { 0xe5de6b,  2,  { 0x90, 0xe9 } },
    { 0xb9c450,  1,  { 0xc3 } },
    { 0xccde58,  3,  { 0x41, 0xb0, 0x01 } },
    { 0x140bf78, 5,  { 0x38, 0xc0, 0x90, 0x90, 0x90 } },
    { 0xd02e06,  2,  { 0x90, 0xe9 } },
    { 0x5e21a0,  2,  { 0xff, 0xe0 } },
    { 0x641d42,  10, { 0xb8, 0x02, 0x00, 0x00, 0x00, 0x90, 0x90, 0x90, 0x90, 0x90 } },
    { 0x2a2390,  1,  { 0xc3 } },
    { 0x7cf700,  1,  { 0xc3 } },
    { 0x13adf10, 1,  { 0xc3 } },
};
static const int loopn1_c = sizeof(loopn1) / sizeof(loopn1[0]);
static const uint64_t weirdzfoffset = 0x1479f81;

static const uint64_t rva1  = 0x989aa0, sz1 = 0x2d94;
static const uint64_t rva2  = 0x760d20, sz2 = 0x3c4f;
static const int      countx = 1000;

static const char rbxhash[] = "2ef3d4bce0105f727bfcc93a6d3da90232374574c19eeaa6a1ef8419a0a55ac1";

static uint8_t dispatcher[] = {
    0x48,0x83,0xec,0x28,
    0x48,0xb8,0x08,0x00,0x00,0x00,0x00,0x01,0x00,0x00,
    0x48,0x8b,0x91,0xf8,0x00,0x00,0x00,
    0x4c,0x8b,0x40,0x08,
    0x4c,0x8b,0x48,0x78, 0x4d,0x01,0xc1, 0x4c,0x39,0xca, 0x0f,0x84,0xb8,0x00,0x00,0x00,
    0x4c,0x8b,0x48,0x10, 0x4d,0x01,0xc1, 0x4c,0x39,0xca, 0x0f,0x84,0x99,0x00,0x00,0x00,
    0x4c,0x8b,0x48,0x18, 0x4d,0x01,0xc1, 0x4c,0x39,0xca, 0x0f,0x84,0x89,0x00,0x00,0x00,
    0x4c,0x8b,0x48,0x20, 0x4d,0x01,0xc1, 0x4c,0x39,0xca, 0x74,0x7d,
    0x4c,0x8b,0x48,0x28, 0x4d,0x01,0xc1, 0x4c,0x39,0xca, 0x74,0x71,
    0x4c,0x8b,0x48,0x30, 0x4d,0x01,0xc1, 0x4c,0x39,0xca, 0x74,0x65,
    0x4c,0x8b,0x48,0x38, 0x4d,0x01,0xc1, 0x4c,0x39,0xca, 0x74,0x59,
    0x4c,0x8b,0x48,0x40, 0x4d,0x01,0xc1, 0x4c,0x39,0xca, 0x74,0x4d,
    0x4c,0x8b,0x48,0x48, 0x4d,0x01,0xc1, 0x4c,0x39,0xca, 0x74,0x41,
    0x4c,0x8b,0x48,0x50, 0x4d,0x01,0xc1, 0x4c,0x39,0xca, 0x74,0x35,
    0x4c,0x8b,0x48,0x58, 0x4d,0x01,0xc1, 0x4c,0x39,0xca, 0x74,0x29,
    0x4c,0x8b,0x48,0x60, 0x4d,0x01,0xc1, 0x4c,0x39,0xca, 0x74,0x1d,
    0x4c,0x8b,0x48,0x68, 0x4d,0x01,0xc1, 0x4c,0x39,0xca, 0x74,0x11,
    0x4c,0x03,0x40,0x70,
    0x4c,0x39,0xc2,
    0x74,0x08,
    0x48,0x83,0xc4,0x28,
    0x48,0xff,0x60,0xf8,
    0x48,0x83,0xc2,0x06,
    0x48,0x89,0x91,0xf8,0x00,0x00,0x00,
    0x31,0xd2,
    0xff,0x10,
    0x80,0x49,0x44,0x40,
    0x48,0x83,0xc2,0x07,
    0x48,0x89,0x91,0xf8,0x00,0x00,0x00,
    0x31,0xd2,
    0xff,0x10
};

static const uint8_t tramp1[]          = { 0x48, 0x89, 0xe1 };
static const uint8_t ntstub[] = { 0x49,0x89,0xca, 0xb8,0x43,0x00,0x00,0x00, 0x0f,0x05, 0xc3 };

static const uint8_t tplhook[44] = {
    0x48,0xb8,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,
    0x4d,0x85,0xc9, 0x74,0x16,
    0x81,0xfa,0x00,0x00,0x00,0x02, 0x75,0x0e,
    0x44,0x8b,0x10, 0x4d,0x39,0x11, 0x75,0x06,
    0xb8,0x22,0x00,0x00,0xc0, 0xc3,
    0x48,0x8b,0x40,0x08, 0x48,0xff,0xe0
};

static const uint8_t ntopstub[11] = {
    0x49,0x89,0xca, 0xb8,0x26,0x00,0x00,0x00, 0x0f,0x05, 0xc3
};

static bool patchr(HANDLE hProc, LPVOID target, const void* buf, SIZE_T len) {
    DWORD old = 0;
    if (!VirtualProtectEx(hProc, target, len, PAGE_EXECUTE_READWRITE, &old)) return false;
    SIZE_T written = 0;
    WriteProcessMemory(hProc, target, buf, len, &written);
    VirtualProtectEx(hProc, target, len, old, &old);
    return written == len;
}

static DWORD64 getbase(HANDLE hProc, const char* name) {
    HMODULE mods[1024]; DWORD needed = 0;
    if (!K32EnumProcessModulesEx(hProc, mods, sizeof(mods), &needed, LIST_MODULES_64BIT)) return 0;
    char buf[MAX_PATH];
    for (int i = 0, n = needed / sizeof(HMODULE); i < n; i++) {
        if (K32GetModuleBaseNameA(hProc, mods[i], buf, MAX_PATH) && !_stricmp(buf, name))
            return (DWORD64)mods[i];
    }
    return 0;
}

static DWORD64 getexportva(HANDLE hProc, DWORD64 base, const char* exp) {
    uint8_t hdr[0x400]; SIZE_T rd;
    if (!ReadProcessMemory(hProc, (LPCVOID)base, hdr, sizeof(hdr), &rd)) return 0;
    PIMAGE_DOS_HEADER dos = (PIMAGE_DOS_HEADER)hdr;
    PIMAGE_NT_HEADERS64 nt = (PIMAGE_NT_HEADERS64)(hdr + dos->e_lfanew);
    DWORD rva = nt->OptionalHeader.DataDirectory[IMAGE_DIRECTORY_ENTRY_EXPORT].VirtualAddress;
    DWORD sz  = nt->OptionalHeader.DataDirectory[IMAGE_DIRECTORY_ENTRY_EXPORT].Size;
    if (!rva) return 0;
    std::vector<uint8_t> eb(sz);
    if (!ReadProcessMemory(hProc, (LPCVOID)(base + rva), eb.data(), sz, &rd)) return 0;
    auto* ed   = (IMAGE_EXPORT_DIRECTORY*)eb.data();
    DWORD* nm  = (DWORD*)(eb.data() + (ed->AddressOfNames - rva));
    WORD*  ord = (WORD* )(eb.data() + (ed->AddressOfNameOrdinals - rva));
    DWORD* fn  = (DWORD*)(eb.data() + (ed->AddressOfFunctions - rva));
    for (DWORD i = 0; i < ed->NumberOfNames; i++) {
        if (nm[i] < rva || nm[i] >= rva + sz) continue;
        if (!strcmp((const char*)(eb.data() + (nm[i] - rva)), exp))
            return base + fn[ord[i]];
    }
    return 0;
}

static bool findsec(HANDLE hProc, DWORD64 img, const char* name, DWORD64* va, DWORD* sz) {
    uint8_t hdr[0x1000]; SIZE_T rd;
    if (!ReadProcessMemory(hProc, (LPCVOID)img, hdr, sizeof(hdr), &rd)) return false;
    auto* dos = (PIMAGE_DOS_HEADER)hdr;
    auto* nt  = (PIMAGE_NT_HEADERS64)(hdr + dos->e_lfanew);
    auto* sec = IMAGE_FIRST_SECTION(nt);
    for (int i = 0; i < nt->FileHeader.NumberOfSections; i++) {
        if (!strncmp((char*)sec[i].Name, name, 8)) {
            *va = img + sec[i].VirtualAddress;
            *sz = sec[i].Misc.VirtualSize;
            return true;
        }
    }
    return false;
}

static bool sha256(const char* path, char out[65]) {
    HANDLE f = CreateFileA(path, GENERIC_READ, FILE_SHARE_READ, NULL, OPEN_EXISTING, 0, NULL);
    if (f == INVALID_HANDLE_VALUE) return false;
    HCRYPTPROV p = 0; HCRYPTHASH h = 0;
    CryptAcquireContextA(&p, NULL, NULL, PROV_RSA_AES, CRYPT_VERIFYCONTEXT);
    CryptCreateHash(p, CALG_SHA_256, 0, 0, &h);
    static uint8_t buf[1 << 20]; DWORD rd;
    while (ReadFile(f, buf, sizeof(buf), &rd, NULL) && rd) CryptHashData(h, buf, rd, 0);
    uint8_t hash[32]; DWORD hl = 32;
    CryptGetHashParam(h, HP_HASHVAL, hash, &hl, 0);
    CryptDestroyHash(h); CryptReleaseContext(p, 0); CloseHandle(f);
    for (int i = 0; i < 32; i++) sprintf(out + i * 2, "%02x", hash[i]);
    out[64] = 0;
    return true;
}

static DWORD findrbxpid() {
    HWND w = FindWindowA(NULL, "Roblox");
    if (!w) return 0;
    DWORD pid = 0; GetWindowThreadProcessId(w, &pid);
    return pid;
}

static bool getrbxpath(DWORD pid, char* out, DWORD len) {
    HANDLE h = OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, FALSE, pid);
    if (!h) return false;
    BOOL ok = QueryFullProcessImageNameA(h, 0, out, &len);
    CloseHandle(h); return ok;
}

static void suspendthr(DWORD pid, bool suspend) {
    HANDLE snap = CreateToolhelp32Snapshot(TH32CS_SNAPTHREAD, 0);
    if (snap == INVALID_HANDLE_VALUE) return;
    THREADENTRY32 te = { sizeof(te) };
    if (Thread32First(snap, &te)) do {
        if (te.th32OwnerProcessID != pid) continue;
        HANDLE t = OpenThread(THREAD_SUSPEND_RESUME, FALSE, te.th32ThreadID);
        if (!t) continue;
        suspend ? SuspendThread(t) : ResumeThread(t);
        CloseHandle(t);
    } while (Thread32Next(snap, &te));
    CloseHandle(snap);
}

static void remapvolx(HANDLE hProc, DWORD64 base) {
    DWORD64 va; DWORD sz;
    if (!findsec(hProc, base, ".byfron", &va, &sz)) return;
    std::vector<uint8_t> saved(sz); SIZE_T rd;
    if (!ReadProcessMemory(hProc, (LPCVOID)va, saved.data(), sz, &rd)) return;
    if (!NT_SUCCESS(g_NtUnmap(hProc, (PVOID)va))) return;
    LPVOID p = VirtualAllocEx(hProc, (LPVOID)va, sz, MEM_COMMIT | MEM_RESERVE, PAGE_EXECUTE_READWRITE);
    if (!p || (DWORD64)p != va) return;
    SIZE_T wr; WriteProcessMemory(hProc, p, saved.data(), sz, &wr);
    DWORD old; VirtualProtectEx(hProc, p, sz, PAGE_EXECUTE_READ, &old);
}

static void hookntopen(DWORD targetPid, DWORD robloxPid) {
    HANDLE hProc = OpenProcess(PROCESS_ALL_ACCESS, FALSE, targetPid);
    if (!hProc) return;
    DWORD64 ntdll = getbase(hProc, "ntdll.dll");
    if (!ntdll) { CloseHandle(hProc); return; }
    DWORD64 ntop = getexportva(hProc, ntdll, "NtOpenProcess");
    if (!ntop) { CloseHandle(hProc); return; }

    LPVOID shell = VirtualAllocEx(hProc, NULL, 0x1000, MEM_COMMIT|MEM_RESERVE, PAGE_EXECUTE_READWRITE);
    LPVOID param = VirtualAllocEx(hProc, NULL, 0x10,   MEM_COMMIT|MEM_RESERVE, PAGE_READWRITE);
    LPVOID stub  = VirtualAllocEx(hProc, NULL, sizeof(ntopstub)+0x100, MEM_COMMIT|MEM_RESERVE, PAGE_EXECUTE_READWRITE);
    if (!shell || !param || !stub) {
        if (shell) VirtualFreeEx(hProc, shell, 0, MEM_RELEASE);
        if (param) VirtualFreeEx(hProc, param, 0, MEM_RELEASE);
        if (stub)  VirtualFreeEx(hProc, stub,  0, MEM_RELEASE);
        CloseHandle(hProc); return;
    }
    SIZE_T wr;
    WriteProcessMemory(hProc, stub, ntopstub, sizeof(ntopstub), &wr);

    uint8_t ps[16] = {};
    memcpy(ps, &robloxPid, 4);
    DWORD64 stubVA = (DWORD64)stub;
    memcpy(ps + 8, &stubVA, 8);
    WriteProcessMemory(hProc, param, ps, 16, &wr);

    uint8_t hook[sizeof(tplhook)];
    memcpy(hook, tplhook, sizeof(hook));
    DWORD64 paramVA = (DWORD64)param;
    memcpy(hook + 2, &paramVA, 8);
    WriteProcessMemory(hProc, shell, hook, sizeof(hook), &wr);
    DWORD old; VirtualProtectEx(hProc, shell, 0x1000, PAGE_EXECUTE_READ, &old);

    uint8_t orig[5] = {}; SIZE_T rd;
    if (!ReadProcessMemory(hProc, (LPCVOID)ntop, orig, 5, &rd) || rd != 5) {
        VirtualFreeEx(hProc, shell, 0, MEM_RELEASE);
        VirtualFreeEx(hProc, param, 0, MEM_RELEASE);
        VirtualFreeEx(hProc, stub,  0, MEM_RELEASE);
        CloseHandle(hProc); return;
    }

    DWORD64 from = ntop, to = (DWORD64)shell;
    int64_t delta = (int64_t)(to - from - 5);
    uint8_t patch[14] = {}; int plen;
    if (delta >= INT32_MIN && delta <= INT32_MAX) {
        patch[0] = 0xe9; int32_t r = (int32_t)delta; memcpy(patch+1, &r, 4); plen = 5;
    } else {
        patch[0] = 0xff; patch[1] = 0x25; memcpy(patch+6, &to, 8); plen = 14;
    }
    VirtualProtectEx(hProc, (LPVOID)ntop, 0x1000, PAGE_EXECUTE_READWRITE, &old);
    WriteProcessMemory(hProc, (LPVOID)ntop, patch, plen, &wr);
    VirtualProtectEx(hProc, (LPVOID)ntop, 0x1000, old, &old);
    
    CloseHandle(hProc);
}

static void install0(DWORD robloxPid) {
    HANDLE snap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (snap == INVALID_HANDLE_VALUE) return;
    PROCESSENTRY32W pe = { sizeof(pe) };
    if (Process32FirstW(snap, &pe)) do {
        if ((pe.th32ProcessID & ~4u) == 0) continue;
        if (pe.th32ProcessID == GetCurrentProcessId()) continue;
        if (pe.th32ProcessID == robloxPid) continue;
        hookntopen(pe.th32ProcessID, robloxPid);
    } while (Process32NextW(snap, &pe));
    CloseHandle(snap);
}

static bool installki(HANDLE hProc, DWORD64 robloxBase) {
    DWORD64 ntdll = getbase(hProc, "ntdll.dll");
    if (!ntdll) return false;
    DWORD64 kiExport = getexportva(hProc, ntdll, "KiUserExceptionDispatcher");
    if (!kiExport) return false;

    auto resolveChain = [&](DWORD64 va) -> DWORD64 {
        for (int i = 0; i < 8; i++) {
            uint8_t b[16] = {}; SIZE_T rd2 = 0;
            if (!ReadProcessMemory(hProc, (LPCVOID)va, b, sizeof(b), &rd2) || rd2 < 6) break;
            if (b[0] == 0xe9) { int32_t r; memcpy(&r, b+1, 4); va = va+5+(int64_t)r; continue; }
            if (b[0] == 0xff && b[1] == 0x25) {
                int32_t d; memcpy(&d, b+2, 4);
                DWORD64 slot = va+6+(int64_t)d, nxt = 0;
                if (!ReadProcessMemory(hProc, (LPCVOID)slot, &nxt, 8, &rd2) || rd2 < 8) break;
                va = nxt; continue;
            }
            if (b[0] == 0xeb) { va = va+2+(int8_t)b[1]; continue; }
            return va;
        }
        return va;
    };

    DWORD64 kifinal = resolveChain(kiExport);
    

    auto allocNear = [&](DWORD64 anchor, SIZE_T size, DWORD prot) -> LPVOID {
        for (DWORD64 dist = 0x10000; dist < 0x60000000ULL; dist += 0x10000) {
            for (int d = 0; d < 2; d++) {
                DWORD64 probe = d ? (anchor - dist) : (anchor + dist);
                if (probe < 0x10000) continue;
                MEMORY_BASIC_INFORMATION mbi;
                if (VirtualQueryEx(hProc, (LPCVOID)probe, &mbi, sizeof(mbi)) != sizeof(mbi)) continue;
                if (mbi.State != MEM_FREE) continue;
                LPVOID got = VirtualAllocEx(hProc, (LPVOID)probe, size, MEM_COMMIT|MEM_RESERVE, prot);
                if (got) return got;
            }
        }
        return NULL;
    };

    LPVOID cave = allocNear(kifinal, 0x4000, PAGE_EXECUTE_READWRITE);
    if (!cave) return false;
    DWORD64 cave1 = (DWORD64)cave, cave2 = (DWORD64)cave + 0x1000;

    LPVOID tblpage  = allocNear(kifinal, 0x1000, PAGE_READWRITE);
    LPVOID miniPage = allocNear(kifinal, 0x1000, PAGE_EXECUTE_READWRITE);
    if (!tblpage || !miniPage) return false;

    DWORD64 tblVA = (DWORD64)tblpage + 8;
    SIZE_T wr; DWORD old;
    WriteProcessMemory(hProc, (LPVOID)cave2, ntstub, sizeof(ntstub), &wr);

    uint8_t tbl[0xa0] = {};
    memcpy(tbl + 8,  &cave2,      8);
    memcpy(tbl + 16, &robloxBase, 8);
    for (int i = 0; i < 12; i++) { DWORD64 o = patchb[i]; memcpy(tbl + 24 + i*8, &o, 8); }
    { DWORD64 o = patchb[12]; memcpy(tbl + 0x78, &o, 8); }
    { DWORD64 o = weirdzfoffset; memcpy(tbl + 0x80, &o, 8); }

    uint8_t kiorig[16] = {};
    ReadProcessMemory(hProc, (LPCVOID)kifinal, kiorig, 16, &wr);

    bool isjmp = false; DWORD64 varesume = 0;
    if (kiorig[0] == 0xff && kiorig[1] == 0x25) {
        int32_t d; memcpy(&d, kiorig+2, 4);
        DWORD64 slot = kifinal+6+(int64_t)d;
        ReadProcessMemory(hProc, (LPCVOID)slot, &varesume, 8, &wr);
        isjmp = true;
    } else if (kiorig[0] == 0xe9) {
        int32_t r; memcpy(&r, kiorig+1, 4);
        varesume = kifinal+5+(int64_t)r; isjmp = true;
    } else if (kiorig[0] == 0xeb) {
        varesume = kifinal+2+(int8_t)kiorig[1]; isjmp = true;
    }

    int plen = 0;
    if (!isjmp) {
        while (plen < 5 && plen < 14) {
            uint8_t b0=kiorig[plen], b1=kiorig[plen+1], b2=kiorig[plen+2], b3=kiorig[plen+3];
            if (b0==0xfc||b0==0xfa||b0==0xfb||b0==0x90){plen++;continue;}
            if (b0==0xf3&&b1==0x0f&&b2==0x1e&&b3==0xfa){plen+=4;continue;}
            if (b0==0x48){
                if(b1==0x83&&(b2==0xec||b2==0xc4)){plen+=4;continue;}
                if(b1==0x81&&(b2==0xec||b2==0xc4)){plen+=7;continue;}
                if(b1==0x8d){
                    uint8_t mod=(b2>>6)&3, rm=b2&7; int l=3+(mod!=3&&rm==4?1:0);
                    if(mod==0&&rm==5)l+=4; else if(mod==1)l+=1; else if(mod==2)l+=4;
                    plen+=l; continue;
                }
                if(b1==0x89||b1==0x8b){
                    uint8_t mod=(b2>>6)&3, rm=b2&7; int l=3+(mod!=3&&rm==4?1:0);
                    if(mod==0&&rm==5)l+=4; else if(mod==1)l+=1; else if(mod==2)l+=4;
                    plen+=l; continue;
                }
            }
            if(b0>=0x50&&b0<=0x57){plen++;continue;}
            if(b0==0x41&&b1>=0x50&&b1<=0x57){plen+=2;continue;}
            if(b0==0xe9){plen+=5;continue;}
            if(b0==0xeb){plen+=2;continue;}
            if(b0==0xff&&b1==0x25){plen+=6;continue;}
            break;
        }
        if (plen < 5) return false;
        if (plen > 14) plen = 14;
        varesume = kifinal + plen;
    }

    uint8_t mini[0x40] = {};
    int ml = 0;
    if (!isjmp) { memcpy(mini, kiorig, plen); ml = plen; }
    mini[ml]=0xff; mini[ml+1]=0x25; mini[ml+2]=mini[ml+3]=mini[ml+4]=mini[ml+5]=0;
    memcpy(mini+ml+6, &varesume, 8);
    WriteProcessMemory(hProc, miniPage, mini, sizeof(mini), &wr);

    DWORD64 miniVA = (DWORD64)miniPage;
    WriteProcessMemory(hProc, tblpage, tbl, sizeof(tbl), &wr);
    WriteProcessMemory(hProc, tblpage, &miniVA, 8, &wr);
    VirtualProtectEx(hProc, tblpage, 0x1000, PAGE_READONLY, &old);
    VirtualProtectEx(hProc, miniPage, 0x1000, PAGE_EXECUTE_READ, &old);

    uint8_t disp[sizeof(dispatcher)];
    memcpy(disp, dispatcher, sizeof(disp));
    memcpy(disp + 6, &tblVA, 8);

    uint8_t cave1buf[sizeof(tramp1) + sizeof(dispatcher)];
    memcpy(cave1buf, tramp1, sizeof(tramp1));
    memcpy(cave1buf + sizeof(tramp1), disp, sizeof(disp));
    WriteProcessMemory(hProc, (LPVOID)cave1, cave1buf, sizeof(cave1buf), &wr);
    VirtualProtectEx(hProc, cave, 0x4000, PAGE_EXECUTE_READ, &old);

    int64_t rel = (int64_t)cave1 - (int64_t)kifinal - 5;
    if (rel < INT32_MIN || rel > INT32_MAX) return false;
    uint8_t jmp[5] = { 0xe9 }; int32_t r = (int32_t)rel; memcpy(jmp+1, &r, 4);
    VirtualProtectEx(hProc, (LPVOID)kifinal, 16, PAGE_EXECUTE_READWRITE, &old);
    WriteProcessMemory(hProc, (LPVOID)kifinal, jmp, 5, &wr);
    VirtualProtectEx(hProc, (LPVOID)kifinal, 16, old, &old);
    return true;
}

static void spray(HANDLE hProc, DWORD64 base) {
    struct Cand { std::vector<uint8_t> b; };
    std::vector<Cand> cands = {
        {{0x90,0x90,0x90,0x90,0x90,0x90}},
        {{0x38,0xc0,0x90,0x90,0x90}},
        {{0xc3}},
        {{0x90,0xe9,0x00,0x00,0x00,0x00}},
        {{0xeb,0x00}},
        {{0xcc}},{{0xcc}},{{0xcc}},{{0xcc}},{{0xcc}},
        {{0xcc}},{{0xcc}},{{0xcc}},{{0xcc}},
        {{0x90,0x90}},
    };
    std::mt19937_64 rng(std::random_device{}());
    struct R { uint64_t rva, sz; };
    R regs[] = { {rva1,sz1}, {rva2,sz2} };
    for (auto& reg : regs) {
        uint64_t rb = base + reg.rva;
        for (int i = 0; i < countx; i++) {
            uint64_t off = rng() % reg.sz;
            size_t ci = rng() % cands.size();
            auto bytes = cands[ci].b;
            if (ci == 3) { uint32_t r2 = (uint32_t)rng(); memcpy(bytes.data()+2, &r2, 4); }
            else if (ci == 4) { bytes[1] = (uint8_t)rng(); }
            if (off + bytes.size() > reg.sz) continue;
            DWORD old;
            if (!VirtualProtectEx(hProc, (LPVOID)(rb+off), bytes.size(), PAGE_EXECUTE_READWRITE, &old)) continue;
            SIZE_T wr; WriteProcessMemory(hProc, (LPVOID)(rb+off), bytes.data(), bytes.size(), &wr);
            VirtualProtectEx(hProc, (LPVOID)(rb+off), bytes.size(), old, &old);
        }
    }
}

static bool inject(HANDLE hProc, DWORD robloxPid, const char* dllPath) {
    DWORD64 k32 = getbase(hProc, "kernel32.dll");
    if (!k32) k32 = getbase(hProc, "KERNELBASE.dll");
    if (!k32) return false;
    DWORD64 loadLib = getexportva(hProc, k32, "LoadLibraryA");
    if (!loadLib) return false;

    LPVOID pathBuf = VirtualAllocEx(hProc, NULL, strlen(dllPath)+1, MEM_COMMIT|MEM_RESERVE, PAGE_READWRITE);
    if (!pathBuf) return false;
    SIZE_T wr; WriteProcessMemory(hProc, pathBuf, dllPath, strlen(dllPath)+1, &wr);

    uint8_t stub[0x20] = {
        0x48,0xb9, 0,0,0,0,0,0,0,0,
        0x48,0xb8, 0,0,0,0,0,0,0,0,
        0x48,0x83,0xec,0x28, 0xff,0xd0, 0x48,0x83,0xc4,0x28, 0xc3
    };
    DWORD64 pv = (DWORD64)pathBuf;
    memcpy(stub+2, &pv, 8); memcpy(stub+12, &loadLib, 8);
    LPVOID stubBuf = VirtualAllocEx(hProc, NULL, sizeof(stub), MEM_COMMIT|MEM_RESERVE, PAGE_EXECUTE_READWRITE);
    if (!stubBuf) return false;
    WriteProcessMemory(hProc, stubBuf, stub, sizeof(stub), &wr);
    DWORD64 stubVA = (DWORD64)stubBuf;

    HANDLE hIocp = NULL;
    DWORD bufSz = 0x10000;
    std::vector<uint8_t> buf(bufSz); ULONG ret = 0; NTSTATUS st;
    while ((st = g_NtQIP(hProc, 0x33, buf.data(), bufSz, &ret)) == 0xC0000004L)
        { bufSz *= 2; buf.resize(bufSz); }
    if (NT_SUCCESS(st) && *(ULONG_PTR*)buf.data()) {
        ULONG_PTR cnt = *(ULONG_PTR*)buf.data();
        struct HE { HANDLE h; ULONG_PTR a,b,c,d; };
        auto* he = (HE*)(buf.data() + 2*sizeof(ULONG_PTR));
        for (ULONG_PTR i = 0; i < cnt && !hIocp; i++) {
            HANDLE dup = NULL;
            if (!DuplicateHandle(hProc, he[i].h, GetCurrentProcess(), &dup, 0, FALSE, DUPLICATE_SAME_ACCESS)) continue;
            uint8_t tb[0x200]; ULONG tr;
            if (NT_SUCCESS(g_NtQObj(dup, 2, tb, sizeof(tb), &tr))) {
                PWSTR tn = *(PWSTR*)(tb+8);
                if (tn && !wcscmp(tn, L"IoCompletion")) { hIocp = dup; dup = NULL; }
            }
            if (dup) CloseHandle(dup);
        }
    }

    if (hIocp) {
        LPVOID dst = NULL;
        MEMORY_BASIC_INFORMATION mbi; DWORD64 addr = 0;
        while (!dst && VirtualQueryEx(hProc, (LPCVOID)addr, &mbi, sizeof(mbi)) == sizeof(mbi)) {
            if (mbi.State == MEM_COMMIT && (mbi.Protect & 0x105) == PAGE_READWRITE && mbi.RegionSize >= 0x48) {
                for (SIZE_T off = 0; off + 0x48 <= mbi.RegionSize && !dst; off += 0x1000) {
                    SIZE_T sz = (mbi.RegionSize - off) < 0x1000 ? (mbi.RegionSize - off) : (SIZE_T)0x1000;
                    std::vector<uint8_t> sc(sz); SIZE_T rd2;
                    if (!ReadProcessMemory(hProc, (uint8_t*)mbi.BaseAddress+off, sc.data(), sz, &rd2)) break;
                    for (size_t k = 0x48; k <= rd2; k++) {
                        bool z = true;
                        for (int zi = 0; zi < 0x48 && z; zi++) z = !sc[k-0x48+zi];
                        if (z) { dst = (uint8_t*)mbi.BaseAddress+off+(k-0x48); break; }
                    }
                }
            }
            addr = (DWORD64)mbi.BaseAddress + mbi.RegionSize;
            if (addr < (DWORD64)mbi.BaseAddress) break;
        }
        if (dst) {
            uint8_t ds[0x48] = {}; memcpy(ds+0x38, &stubVA, 8);
            DWORD old; VirtualProtectEx(hProc, dst, 0x48, PAGE_READWRITE, &old);
            WriteProcessMemory(hProc, dst, ds, 0x48, &wr);
            VirtualProtectEx(hProc, dst, 0x48, old, &old);
            if (NT_SUCCESS(g_NtSetIo(hIocp, (ULONG_PTR)dst, 0, 0, 0))) {
                CloseHandle(hIocp);
                for (int w = 0; w < 2000; w++) {
                    Sleep(1);
                    DWORD ec = 0;
                    if (GetExitCodeProcess(hProc, &ec) && ec != STILL_ACTIVE) return false;
                    DWORD64 mb = getbase(hProc, "PearlModule.dll");
                    if (!mb) mb = getbase(hProc, "pearl.dll");
                    if (mb) return true;
                }
                goto fallback;
            }
            CloseHandle(hIocp);
        } else CloseHandle(hIocp);
    }
fallback:
    HANDLE ht = CreateRemoteThread(hProc, NULL, 0, (LPTHREAD_START_ROUTINE)loadLib, pathBuf, 0, NULL);
    if (!ht) return false;
    WaitForSingleObject(ht, 5000); CloseHandle(ht);
    return true;
}

static bool dll2temp(const char* src, char* out, DWORD len) {
    char tmp[MAX_PATH]; GetTempPathA(MAX_PATH, tmp);
    snprintf(out, len, "%svelocity_mod.dll", tmp);
    if (CopyFileA(src, out, FALSE)) return true;
    return GetFileAttributesA(out) != INVALID_FILE_ATTRIBUTES;
}

static bool isadmin() {
    HANDLE t = NULL; TOKEN_ELEVATION e = {}; DWORD sz = sizeof(e);
    if (!OpenProcessToken(GetCurrentProcess(), TOKEN_QUERY, &t)) return false;
    BOOL ok = GetTokenInformation(t, TokenElevation, &e, sz, &sz);
    CloseHandle(t); return ok && e.TokenIsElevated;
}

static void adminize(int argc, char** argv) {
    char self[MAX_PATH]; GetModuleFileNameA(NULL, self, MAX_PATH);
    std::string p;
    for (int i = 1; i < argc; i++) { if (i>1) p+=" "; p+="\""; p+=argv[i]; p+="\""; }
    SHELLEXECUTEINFOA sei = { sizeof(sei) };
    sei.lpVerb = "runas"; sei.lpFile = self;
    sei.lpParameters = p.empty() ? NULL : p.c_str();
    sei.nShow = SW_NORMAL; sei.fMask = SEE_MASK_NOCLOSEPROCESS;
    if (!ShellExecuteExA(&sei)) ExitProcess(1);
    if (sei.hProcess) CloseHandle(sei.hProcess);
    ExitProcess(0);
}

static void initnt() {
    HMODULE n = GetModuleHandleA("ntdll.dll");
    g_NtUnmap  = (pfnNtUnmapViewOfSection)    GetProcAddress(n, "NtUnmapViewOfSection");
    g_NtSetIo  = (pfnNtSetIoCompletion)        GetProcAddress(n, "NtSetIoCompletion");
    g_NtQIP    = (pfnNtQueryInformationProcess)GetProcAddress(n, "NtQueryInformationProcess");
    g_NtQObj   = (pfnNtQueryObject)            GetProcAddress(n, "NtQueryObject");
}

static void enabledebug() {
    HANDLE t; TOKEN_PRIVILEGES tp = {};
    if (!OpenProcessToken(GetCurrentProcess(), TOKEN_ADJUST_PRIVILEGES|TOKEN_QUERY, &t)) return;
    LookupPrivilegeValueA(NULL, "SeDebugPrivilege", &tp.Privileges[0].Luid);
    tp.PrivilegeCount = 1; tp.Privileges[0].Attributes = SE_PRIVILEGE_ENABLED;
    AdjustTokenPrivileges(t, FALSE, &tp, sizeof(tp), NULL, NULL);
    CloseHandle(t);
}

int main(int argc, char** argv) {
    if (!isadmin()) { adminize(argc, argv); return 0; }
    initnt();
    enabledebug();

    char modPath[MAX_PATH];
    if (argc >= 2) { strncpy(modPath, argv[1], MAX_PATH-1); }
    else {
        GetModuleFileNameA(NULL, modPath, MAX_PATH);
        PathRemoveFileSpecA(modPath);
        strncat(modPath, "\\PearlModule.dll", MAX_PATH - strlen(modPath) - 1);
    }
    if (GetFileAttributesA(modPath) == INVALID_FILE_ATTRIBUTES) {
         return 1;
    }

    DWORD pid = findrbxpid();
    if (!pid) {  return 1; }
    

    char rblxPath[MAX_PATH] = {};
    getrbxpath(pid, rblxPath, MAX_PATH);

    char hash[65] = {};
    sha256(rblxPath, hash);
    if (_stricmp(hash, rbxhash)) {
        
    }

    install0(pid);

    char dropped[MAX_PATH];
    if (!dll2temp(modPath, dropped, MAX_PATH)) {  return 1; }

    HANDLE hProc = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid);
    if (!hProc) {  return 1; }

    DWORD64 base = getbase(hProc, "RobloxPlayerBeta.dll");
    if (!base) base = getbase(hProc, "RobloxPlayerBeta.exe");
    if (!base) { CloseHandle(hProc); return 1; }
    

    suspendthr(pid, true);
    remapvolx(hProc, base);

    bool l2 = installki(hProc, base);

    for (int i = 0; i < loopn1_c; i++)
        patchr(hProc, (LPVOID)(base + loopn1[i].rva), loopn1[i].bytes, loopn1[i].len);

    for (int i = 0; i < patcha_c; i++) {
        uint8_t eb = 0xeb;
        patchr(hProc, (LPVOID)(base + patcha[i]), &eb, 1);
    }

    if (l2) {
        for (int i = 0; i < patchb_c; i++) {
            uint8_t cc = 0xcc;
            patchr(hProc, (LPVOID)(base + patchb[i]), &cc, 1);
        }
        spray(hProc, base);
    }

    suspendthr(pid, false);
    Sleep(50);

    if (!inject(hProc, pid, dropped)) {
        
        CloseHandle(hProc); return 1;
    }

    
    CloseHandle(hProc);
    return 0;
}
