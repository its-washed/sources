"use client";

import { usePathname } from "next/navigation";
import { User, Receipt, Code, Tag, Image, ShieldAlert } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";

const sidebarItems = [
  { label: "Overview", href: "/account", icon: <User className="h-4 w-4" /> },
  { label: "Invoices", href: "/account/invoices", icon: <Receipt className="h-4 w-4" /> },
  { label: "Embeds", href: "/account/embeds", icon: <Code className="h-4 w-4" /> },
  { label: "Aliases", href: "/account/aliases", icon: <Tag className="h-4 w-4" /> },
  { label: "Avatar History", href: "/account/avatars", icon: <Image className="h-4 w-4" /> },
  { label: "Punishments", href: "/account/punishments", icon: <ShieldAlert className="h-4 w-4" /> },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 overflow-y-auto pt-26 px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
