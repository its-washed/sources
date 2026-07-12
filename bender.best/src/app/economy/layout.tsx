"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building,
  Store,
  FlaskConical,
  CreditCard,
  RotateCcw,
  Building2,
  ArrowLeftRight,
  Trophy,
  Gamepad2,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";

const sidebarItems = [
  { label: "Overview", href: "/economy", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Property", href: "/economy/property", icon: <Building className="h-4 w-4" /> },
  { label: "Business", href: "/economy/business", icon: <Store className="h-4 w-4" /> },
  { label: "Laboratory", href: "/economy/laboratory", icon: <FlaskConical className="h-4 w-4" /> },
  { label: "Cards", href: "/economy/cards", icon: <CreditCard className="h-4 w-4" /> },
  { label: "Rebirth", href: "/economy/rebirth", icon: <RotateCcw className="h-4 w-4" /> },
  {
    label: "Company",
    href: "/economy/company",
    icon: <Building2 className="h-4 w-4" />,
    children: [
      { label: "Overview", href: "/economy/company" },
      { label: "Projects", href: "/economy/company/projects" },
      { label: "Members", href: "/economy/company/members" },
      { label: "Transactions", href: "/economy/company/transactions" },
    ],
  },
  { label: "Transactions", href: "/economy/transactions", icon: <ArrowLeftRight className="h-4 w-4" /> },
  { label: "Leaderboard", href: "/economy/leaderboard", icon: <Trophy className="h-4 w-4" /> },
  {
    label: "Games",
    href: "/economy/games",
    icon: <Gamepad2 className="h-4 w-4" />,
    children: [
      { label: "Mines", href: "/economy/games/mines" },
      { label: "Plinko", href: "/economy/games/plinko" },
      { label: "Dice", href: "/economy/games/dice" },
      { label: "Roulette", href: "/economy/games/roulette" },
      { label: "Higher Lower", href: "/economy/games/hilo" },
      { label: "Chicken Road", href: "/economy/games/chicken" },
      { label: "Keno", href: "/economy/games/keno" },
      { label: "Blackjack", href: "/economy/games/blackjack" },
    ],
  },
];

export default function EconomyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar items={sidebarItems} activePath={pathname} />
        <main className="flex-1 overflow-y-auto px-8 pt-26">
          {children}
        </main>
      </div>
    </div>
  );
}
