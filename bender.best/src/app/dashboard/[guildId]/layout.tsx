"use client";

import { use } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
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

export default function GuildLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ guildId: string }>;
}) {
  const { guildId } = use(params);
  const pathname = usePathname();

  const guildSidebarItems: SideNavItem[] = [
    { label: "Overview", href: `/dashboard/${guildId}`, icon: <LayoutDashboard className="h-4 w-4" /> },
    {
      label: "Control Panel",
      href: `/dashboard/${guildId}/control-panel`,
      icon: <Settings className="h-4 w-4" />,
      children: [
        { label: "General", href: `/dashboard/${guildId}/control-panel` },
        { label: "Add Server", href: `/dashboard/${guildId}/control-panel/add-server` },
      ],
    },
    { label: "Leveling", href: `/dashboard/${guildId}/leveling`, icon: <TrendingUp className="h-4 w-4" /> },
    { label: "Rewards", href: `/dashboard/${guildId}/rewards`, icon: <Gift className="h-4 w-4" /> },
    { label: "Giveaways", href: `/dashboard/${guildId}/giveaways`, icon: <PartyPopper className="h-4 w-4" /> },
    {
      label: "Tickets",
      href: `/dashboard/${guildId}/tickets`,
      icon: <Ticket className="h-4 w-4" />,
      children: [
        { label: "Panels", href: `/dashboard/${guildId}/tickets/panels` },
        { label: "Topics", href: `/dashboard/${guildId}/tickets/topics` },
        { label: "Settings", href: `/dashboard/${guildId}/tickets/settings` },
        { label: "Transcripts", href: `/dashboard/${guildId}/tickets/transcripts` },
      ],
    },
    { label: "Settings", href: `/dashboard/${guildId}/settings`, icon: <Settings2 className="h-4 w-4" /> },
    { label: "Commands", href: `/dashboard/${guildId}/commands`, icon: <Terminal className="h-4 w-4" /> },
    { label: "Embeds", href: `/dashboard/${guildId}/embeds`, icon: <Code2 className="h-4 w-4" /> },
    { label: "Messages", href: `/dashboard/${guildId}/messages`, icon: <Mail className="h-4 w-4" /> },
    {
      label: "Community",
      href: `/dashboard/${guildId}/community`,
      icon: <Users className="h-4 w-4" />,
      children: [
        { label: "Birthdays", href: `/dashboard/${guildId}/community/birthdays` },
        { label: "Booster Roles", href: `/dashboard/${guildId}/community/booster-roles` },
        { label: "Auto Roles", href: `/dashboard/${guildId}/community/auto-roles` },
        { label: "Starboard", href: `/dashboard/${guildId}/community/starboard` },
        { label: "Suggestions", href: `/dashboard/${guildId}/community/suggestions` },
      ],
    },
    {
      label: "Security",
      href: `/dashboard/${guildId}/security`,
      icon: <Shield className="h-4 w-4" />,
      children: [
        { label: "Antinuke", href: `/dashboard/${guildId}/antinuke` },
        { label: "Antiraid", href: `/dashboard/${guildId}/antiraid` },
        { label: "AI Moderation", href: `/dashboard/${guildId}/ai-moderation` },
      ],
    },
    {
      label: "Social Alerts",
      href: `/dashboard/${guildId}/social`,
      icon: <Bell className="h-4 w-4" />,
      children: [
        { label: "YouTube", href: `/dashboard/${guildId}/social/youtube` },
        { label: "Twitch", href: `/dashboard/${guildId}/social/twitch` },
        { label: "TikTok", href: `/dashboard/${guildId}/social/tiktok` },
        { label: "Kick", href: `/dashboard/${guildId}/social/kick` },
        { label: "Instagram", href: `/dashboard/${guildId}/social/instagram` },
        { label: "X", href: `/dashboard/${guildId}/social/x` },
      ],
    },
    { label: "Messaging", href: `/dashboard/${guildId}/messaging`, icon: <MessageSquare className="h-4 w-4" /> },
    {
      label: "Moderation",
      href: `/dashboard/${guildId}/moderation`,
      icon: <Gavel className="h-4 w-4" />,
      children: [
        { label: "Punishments", href: `/dashboard/${guildId}/moderation/punishments` },
        { label: "Appeals", href: `/dashboard/${guildId}/moderation/appeals` },
        { label: "Commands", href: `/dashboard/${guildId}/moderation/commands` },
        { label: "Warnings", href: `/dashboard/${guildId}/moderation/warnings` },
        { label: "Settings", href: `/dashboard/${guildId}/moderation/settings` },
      ],
    },
    { label: "Permissions", href: `/dashboard/${guildId}/permissions`, icon: <Key className="h-4 w-4" /> },
    { label: "Fake Permissions", href: `/dashboard/${guildId}/fake-permissions`, icon: <KeyRound className="h-4 w-4" /> },
    {
      label: "Invite Tracker",
      href: `/dashboard/${guildId}/invites`,
      icon: <UserPlus className="h-4 w-4" />,
      children: [
        { label: "Settings", href: `/dashboard/${guildId}/invites/settings` },
        { label: "Leaderboard", href: `/dashboard/${guildId}/invites/leaderboard` },
        { label: "Invites", href: `/dashboard/${guildId}/invites/invites` },
      ],
    },
    {
      label: "Management",
      href: `/dashboard/${guildId}/management`,
      icon: <Server className="h-4 w-4" />,
      children: [
        { label: "Control Panel", href: `/dashboard/${guildId}/management/control-panel` },
        { label: "Modules", href: `/dashboard/${guildId}/management/modules` },
      ],
    },
    { label: "Temp Voice", href: `/dashboard/${guildId}/tempvoice`, icon: <Mic className="h-4 w-4" /> },
    { label: "Music", href: `/dashboard/${guildId}/music`, icon: <Music className="h-4 w-4" /> },
    { label: "Counters", href: `/dashboard/${guildId}/counters`, icon: <Hash className="h-4 w-4" /> },
    { label: "Antiraid", href: `/dashboard/${guildId}/antiraid`, icon: <ShieldAlert className="h-4 w-4" /> },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="fixed left-0 top-20 z-30 h-[calc(100vh-5rem)] w-64 overflow-y-auto border-r border-sidebar-border bg-sidebar-bg">
          <div className="border-b border-sidebar-border p-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
                G
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Gaming Hub</p>
                <p className="text-xs text-muted-foreground">12,450 members</p>
              </div>
            </div>
          </div>
          <Sidebar items={guildSidebarItems} activePath={pathname} />
        </aside>
        <main className="ml-64 flex-1 overflow-y-auto p-6 pt-26">{children}</main>
      </div>
    </div>
  );
}
