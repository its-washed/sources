"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import {
  LayoutDashboard,
  Settings,
  TrendingUp,
  Gift,
  PartyPopper,
  Ticket,
  Settings2,
  Terminal,
  Code2,
  Mail,
  Users,
  Shield,
  Bell,
  MessageSquare,
  Gavel,
  Key,
  KeyRound,
  UserPlus,
  Server,
  Mic,
  Music,
  Hash,
  ShieldAlert,
} from "lucide-react";

interface SideNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: { label: string; href: string }[];
}

const sidebarItems: SideNavItem[] = [
  { label: "Overview", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  {
    label: "Control Panel",
    href: "/dashboard/control-panel",
    icon: <Settings className="h-4 w-4" />,
    children: [
      { label: "General", href: "/dashboard/control-panel/general" },
      { label: "Add Server", href: "/dashboard/control-panel/add-server" },
    ],
  },
  { label: "Leveling", href: "/dashboard/leveling", icon: <TrendingUp className="h-4 w-4" /> },
  { label: "Rewards", href: "/dashboard/rewards", icon: <Gift className="h-4 w-4" /> },
  { label: "Giveaways", href: "/dashboard/giveaways", icon: <PartyPopper className="h-4 w-4" /> },
  {
    label: "Tickets",
    href: "/dashboard/tickets",
    icon: <Ticket className="h-4 w-4" />,
    children: [
      { label: "Panels", href: "/dashboard/tickets/panels" },
      { label: "Topics", href: "/dashboard/tickets/topics" },
      { label: "Settings", href: "/dashboard/tickets/settings" },
      { label: "Transcripts", href: "/dashboard/tickets/transcripts" },
    ],
  },
  { label: "Settings", href: "/dashboard/settings", icon: <Settings2 className="h-4 w-4" /> },
  { label: "Commands", href: "/dashboard/commands", icon: <Terminal className="h-4 w-4" /> },
  { label: "Embeds", href: "/dashboard/embeds", icon: <Code2 className="h-4 w-4" /> },
  { label: "Messages", href: "/dashboard/messages", icon: <Mail className="h-4 w-4" /> },
  {
    label: "Community",
    href: "/dashboard/community",
    icon: <Users className="h-4 w-4" />,
    children: [
      { label: "Birthdays", href: "/dashboard/community/birthdays" },
      { label: "Booster Roles", href: "/dashboard/community/booster-roles" },
      { label: "Auto Roles", href: "/dashboard/community/auto-roles" },
      { label: "Starboard", href: "/dashboard/community/starboard" },
      { label: "Suggestions", href: "/dashboard/community/suggestions" },
    ],
  },
  {
    label: "Security",
    href: "/dashboard/security",
    icon: <Shield className="h-4 w-4" />,
    children: [
      { label: "Antinuke", href: "/dashboard/antinuke" },
      { label: "Antiraid", href: "/dashboard/antiraid" },
      { label: "AI Moderation", href: "/dashboard/ai-moderation" },
    ],
  },
  {
    label: "Social Alerts",
    href: "/dashboard/social",
    icon: <Bell className="h-4 w-4" />,
    children: [
      { label: "YouTube", href: "/dashboard/social/youtube" },
      { label: "Twitch", href: "/dashboard/social/twitch" },
      { label: "TikTok", href: "/dashboard/social/tiktok" },
      { label: "Kick", href: "/dashboard/social/kick" },
      { label: "Instagram", href: "/dashboard/social/instagram" },
      { label: "X", href: "/dashboard/social/x" },
    ],
  },
  { label: "Messaging", href: "/dashboard/messaging", icon: <MessageSquare className="h-4 w-4" /> },
  {
    label: "Moderation",
    href: "/dashboard/moderation",
    icon: <Gavel className="h-4 w-4" />,
    children: [
      { label: "Punishments", href: "/dashboard/moderation/punishments" },
      { label: "Appeals", href: "/dashboard/moderation/appeals" },
      { label: "Commands", href: "/dashboard/moderation/commands" },
      { label: "Warnings", href: "/dashboard/moderation/warnings" },
      { label: "Settings", href: "/dashboard/moderation/settings" },
    ],
  },
  { label: "Permissions", href: "/dashboard/permissions", icon: <Key className="h-4 w-4" /> },
  { label: "Fake Permissions", href: "/dashboard/fake-permissions", icon: <KeyRound className="h-4 w-4" /> },
  {
    label: "Invite Tracker",
    href: "/dashboard/invites",
    icon: <UserPlus className="h-4 w-4" />,
    children: [
      { label: "Settings", href: "/dashboard/invites/settings" },
      { label: "Leaderboard", href: "/dashboard/invites/leaderboard" },
      { label: "Invites", href: "/dashboard/invites/invites" },
    ],
  },
  {
    label: "Management",
    href: "/dashboard/management",
    icon: <Server className="h-4 w-4" />,
    children: [
      { label: "Control Panel", href: "/dashboard/management/control-panel" },
      { label: "Modules", href: "/dashboard/management/modules" },
    ],
  },
  { label: "Temp Voice", href: "/dashboard/tempvoice", icon: <Mic className="h-4 w-4" /> },
  { label: "Music", href: "/dashboard/music", icon: <Music className="h-4 w-4" /> },
  { label: "Counters", href: "/dashboard/counters", icon: <Hash className="h-4 w-4" /> },
  { label: "Antiraid", href: "/dashboard/antiraid", icon: <ShieldAlert className="h-4 w-4" /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGuildPage = pathname !== "/dashboard";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        {!isGuildPage && (
          <Sidebar items={sidebarItems} activePath={pathname} />
        )}
        <main className={`flex-1 overflow-y-auto p-6 pt-26 ${!isGuildPage ? "ml-64" : ""}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
