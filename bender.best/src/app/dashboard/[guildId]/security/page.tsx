"use client";

import { use } from "react";
import { Shield, ShieldAlert, Brain, Lock, Unlock, Eye } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const securityModules = [
  { name: "Antinuke", enabled: true, icon: <Shield className="h-5 w-5" /> },
  { name: "Antiraid", enabled: true, icon: <ShieldAlert className="h-5 w-5" /> },
  { name: "AI Moderation", enabled: false, icon: <Brain className="h-5 w-5" /> },
];

const recentEvents = [
  { id: 1, type: "Antinuke", detail: "Blocked role deletion by CompromisedAdmin", time: "5m ago", severity: "critical" },
  { id: 2, type: "Antiraid", detail: "Raid detected — 12 joins in 30s", time: "1h ago", severity: "warning" },
  { id: 3, type: "Antinuke", detail: "Quarantined suspicious bot: SpamBot#1234", time: "2h ago", severity: "critical" },
  { id: 4, type: "Antiraid", detail: "Lockdown lifted after raid subsided", time: "3h ago", severity: "success" },
  { id: 5, type: "AI Moderation", detail: "Toxic message filtered in #general", time: "6h ago", severity: "warning" },
];

const severityStyles: Record<string, string> = {
  critical: "text-destructive",
  warning: "text-yellow-300",
  success: "text-success",
};

export default function SecurityPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Security</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {securityModules.map((mod) => (
          <Card key={mod.name}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {mod.icon}
                <CardTitle>{mod.name}</CardTitle>
              </div>
              <Badge variant={mod.enabled ? "success" : "muted"}>
                {mod.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Protection Level</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Server Security Score</span>
            <span className="text-2xl font-bold text-success">99%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-success" style={{ width: "99%" }} />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {recentEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-3 rounded-lg bg-secondary/50 px-4 py-3"
            >
              <Eye className={`h-4 w-4 shrink-0 ${severityStyles[event.severity]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{event.type}:</span> {event.detail}
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{event.time}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <div className="flex flex-wrap gap-3">
          <Button variant="destructive">
            <Lock className="h-4 w-4" />
            Lock Server
          </Button>
          <Button variant="default">
            <Unlock className="h-4 w-4" />
            Unlock Server
          </Button>
          <Button variant="default">
            <ShieldAlert className="h-4 w-4" />
            Check Raids
          </Button>
        </div>
      </Card>
    </div>
  );
}
