"use client";

import { use } from "react";
import {
  MessageSquare,
  Users,
  UserPlus,
  UserMinus,
  TrendingUp,
  Gift,
  Gavel,
  Ticket,
  Music,
  PartyPopper,
  Shield,
  Clock,
  Ban,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";

const recentActivity = [
  { id: 1, type: "join", user: "NewUser123", detail: "joined the server", time: "2m ago", icon: <UserPlus className="h-4 w-4 text-success" /> },
  { id: 2, type: "message", user: "CoolGamer", detail: "sent 15 messages in #general", time: "5m ago", icon: <MessageSquare className="h-4 w-4 text-primary" /> },
  { id: 3, type: "leave", user: "OldMember42", detail: "left the server", time: "12m ago", icon: <UserMinus className="h-4 w-4 text-destructive" /> },
  { id: 4, type: "mod", user: "Moderator", detail: "muted SpamBot99 for 1h", time: "18m ago", icon: <Gavel className="h-4 w-4 text-warning" /> },
  { id: 5, type: "join", user: "MusicFan", detail: "joined the server", time: "25m ago", icon: <UserPlus className="h-4 w-4 text-success" /> },
  { id: 6, type: "level", user: "ProPlayer", detail: "reached level 50", time: "30m ago", icon: <TrendingUp className="h-4 w-4 text-primary" /> },
  { id: 7, type: "ticket", user: "HelpSeeker", detail: "opened a support ticket", time: "45m ago", icon: <Ticket className="h-4 w-4 text-primary" /> },
  { id: 8, type: "mod", user: "Admin", detail: "banned ToxicUser for raiding", time: "1h ago", icon: <Ban className="h-4 w-4 text-destructive" /> },
];

const moduleStatus = [
  { name: "Leveling", enabled: true, icon: <TrendingUp className="h-4 w-4" /> },
  { name: "Economy", enabled: true, icon: <Gift className="h-4 w-4" /> },
  { name: "Moderation", enabled: true, icon: <Gavel className="h-4 w-4" /> },
  { name: "Tickets", enabled: true, icon: <Ticket className="h-4 w-4" /> },
  { name: "Music", enabled: false, icon: <Music className="h-4 w-4" /> },
  { name: "Giveaways", enabled: true, icon: <PartyPopper className="h-4 w-4" /> },
  { name: "Antinuke", enabled: true, icon: <Shield className="h-4 w-4" /> },
];

export default function GuildOverviewPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white">
          G
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gaming Hub</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" /> 12,450 members
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-success" /> 3,200 online
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<MessageSquare className="h-5 w-5" />} label="Messages Today" value="1,247" />
        <StatCard icon={<Users className="h-5 w-5" />} label="Active Members" value="342" />
        <StatCard icon={<UserPlus className="h-5 w-5" />} label="Joins Today" value="15" />
        <StatCard icon={<UserMinus className="h-5 w-5" />} label="Leaves Today" value="3" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center gap-3 rounded-lg bg-secondary/50 px-3 py-2">
                {item.icon}
                <div className="flex-1 text-sm">
                  <span className="font-medium text-foreground">{item.user}</span>{" "}
                  <span className="text-muted-foreground">{item.detail}</span>
                </div>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Module Status</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 gap-3">
            {moduleStatus.map((mod) => (
              <div
                key={mod.name}
                className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  {mod.icon}
                  {mod.name}
                </div>
                <Badge variant={mod.enabled ? "success" : "muted"}>
                  {mod.enabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
