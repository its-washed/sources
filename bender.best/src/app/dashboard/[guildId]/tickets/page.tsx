"use client";

import { use } from "react";
import Link from "next/link";
import { Ticket, Clock, Settings2, BookOpen, MessageSquare } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const panels = [
  { name: "Support", buttonLabel: "🎫 Open Ticket", channel: "#support", openCount: 4, color: "#5865F2" },
  { name: "Report", buttonLabel: "🚨 Report User", channel: "#reports", openCount: 2, color: "#ED4245" },
  { name: "Partnership", buttonLabel: "🤝 Partnership Request", channel: "#partnerships", openCount: 1, color: "#57F287" },
];

export default function TicketsPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  const { guildId } = use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Ticket className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Tickets</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={<Ticket className="h-5 w-5" />} label="Open Tickets" value="7" />
        <StatCard icon={<Clock className="h-5 w-5" />} label="Closed Today" value="12" />
        <StatCard icon={<MessageSquare className="h-5 w-5" />} label="Avg Response" value="4m 32s" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Panels</CardTitle>
          <Button variant="primary" size="sm">Create Panel</Button>
        </CardHeader>
        <div className="space-y-3">
          {panels.map((panel) => (
            <div
              key={panel.name}
              className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
                  style={{ backgroundColor: `${panel.color}20`, color: panel.color }}
                >
                  {panel.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{panel.name}</p>
                  <p className="text-xs text-muted-foreground">{panel.buttonLabel} → {panel.channel}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="default">{panel.openCount} open</Badge>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Link href={`/dashboard/${guildId}/tickets/topics`}>
            <div className="flex items-center gap-3 rounded-lg bg-secondary/50 px-4 py-3 transition-colors hover:bg-secondary">
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Topics</p>
                <p className="text-xs text-muted-foreground">Manage ticket topics</p>
              </div>
            </div>
          </Link>
          <Link href={`/dashboard/${guildId}/tickets/settings`}>
            <div className="flex items-center gap-3 rounded-lg bg-secondary/50 px-4 py-3 transition-colors hover:bg-secondary">
              <Settings2 className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Settings</p>
                <p className="text-xs text-muted-foreground">Configure ticket system</p>
              </div>
            </div>
          </Link>
          <Link href={`/dashboard/${guildId}/tickets/transcripts`}>
            <div className="flex items-center gap-3 rounded-lg bg-secondary/50 px-4 py-3 transition-colors hover:bg-secondary">
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Transcripts</p>
                <p className="text-xs text-muted-foreground">View ticket logs</p>
              </div>
            </div>
          </Link>
        </div>
      </Card>
    </div>
  );
}
