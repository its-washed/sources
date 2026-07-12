"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Terminal,
  List,
  Clock,
  Users,
  Crown,
  TrendingUp,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Settings,
} from "lucide-react";

const publicLinks = [
  { label: "Commands", href: "/commands", icon: Terminal },
  { label: "Servers", href: "/servers", icon: List },
  { label: "Avatars", href: "/avatars", icon: Clock },
  { label: "Team", href: "/team", icon: Users },
  { label: "Premium", href: "/premium", icon: Crown },
  { label: "Status", href: "/status", icon: TrendingUp },
];

interface NavbarProps {
  isLoggedIn?: boolean;
}

export function Navbar({ isLoggedIn = true }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex h-16 max-w-5xl items-center gap-6 rounded-2xl border border-border/50 bg-card/80 px-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_1px_3px_rgba(0,0,0,0.3)] backdrop-blur-md lg:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-lg font-bold text-foreground">
          <Image src="/images/icon.png" alt="Bender Avatar" width={36} height={36} className="rounded-xl" />
          <span>
            bender<span className="text-primary">.</span>best
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <link.icon className="h-3.5 w-3.5" />
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <div className="hidden items-center gap-1 md:flex">
                {[
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Economy", href: "/economy" },
                  { label: "Account", href: "/account" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="relative">
                <button
                  onClick={() => setAvatarOpen(!avatarOpen)}
                  className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-accent"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/30 ring-2 ring-primary/50">
                    <div className="flex h-full w-full items-center justify-center text-xs font-bold text-primary">
                      B
                    </div>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>

                {avatarOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setAvatarOpen(false)} />
                    <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-popover p-1.5 shadow-lg">
                      <div className="border-b border-border px-3 py-2">
                        <p className="text-sm font-medium text-foreground">BenderUser</p>
                        <p className="text-xs text-muted-foreground">bender@discord</p>
                      </div>
                      <Link
                        href="/account"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        onClick={() => setAvatarOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        Account
                      </Link>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        onClick={() => setAvatarOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <button
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                        onClick={() => setAvatarOpen(false)}
                      >
                        <LogOut className="h-4 w-4" />
                        Log Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/api/auth/discord"
                className="hidden items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20 sm:inline-flex"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4889 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0279C.5334 9.0458-.319 13.5599.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1267c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1266c-.5983.3432-1.2202.6447-1.8733.8919a.0766.0766 0 00-.0407.1066c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
                </svg>
                Login with Discord
              </Link>
              <a
                href="https://discord.gg/bender"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#5865F2" }}
              >
                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4889 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0279C.5334 9.0458-.319 13.5599.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1267c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1266c-.5983.3432-1.2202.6447-1.8733.8919a.0766.0766 0 00-.0407.1066c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
                </svg>
              </a>
            </>
          )}

          <button
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-5xl rounded-2xl border border-border bg-card p-4 shadow-lg lg:hidden">
          <nav className="flex flex-col gap-1">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
            {!isLoggedIn && (
              <Link
                href="/api/auth/discord"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20"
                onClick={() => setMobileOpen(false)}
              >
                Login with Discord
              </Link>
            )}
            {isLoggedIn &&
              [
                { label: "Dashboard", href: "/dashboard" },
                { label: "Economy", href: "/economy" },
                { label: "Account", href: "/account" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
