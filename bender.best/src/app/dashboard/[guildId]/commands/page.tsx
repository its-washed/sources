"use client";

import { use, useState } from "react";
import { Terminal, Search } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";

const commands = [
  { name: "/ban", category: "Moderation", enabled: true, channels: ["#mod-commands"], roles: ["@Moderator", "@Admin"] },
  { name: "/kick", category: "Moderation", enabled: true, channels: ["#mod-commands"], roles: ["@Moderator"] },
  { name: "/mute", category: "Moderation", enabled: true, channels: ["#mod-commands"], roles: ["@Moderator"] },
  { name: "/warn", category: "Moderation", enabled: true, channels: ["#mod-commands"], roles: ["@Moderator"] },
  { name: "/balance", category: "Economy", enabled: true, channels: [], roles: [] },
  { name: "/daily", category: "Economy", enabled: true, channels: ["#bot-commands"], roles: [] },
  { name: "/work", category: "Economy", enabled: false, channels: ["#bot-commands"], roles: [] },
  { name: "/play", category: "Music", enabled: true, channels: ["#music"], roles: [] },
  { name: "/skip", category: "Music", enabled: true, channels: ["#music"], roles: ["@DJ"] },
  { name: "/8ball", category: "Fun", enabled: true, channels: [], roles: [] },
];

const categories = [
  { label: "All", value: "all" },
  { label: "Moderation", value: "Moderation" },
  { label: "Economy", value: "Economy" },
  { label: "Utility", value: "Utility" },
  { label: "Fun", value: "Fun" },
  { label: "Music", value: "Music" },
];

export default function CommandsPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  use(params);
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Terminal className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Commands</h1>
      </div>

      <Card>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search commands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-secondary border-border rounded-lg px-3 py-2 pl-10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full max-w-sm"
            />
          </div>
        </div>

        <Tabs tabs={categories} defaultTab="all">
          {(activeTab) => {
            const filtered = commands.filter(
              (cmd) =>
                (activeTab === "all" || cmd.category === activeTab) &&
                cmd.name.toLowerCase().includes(search.toLowerCase())
            );

            return (
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Command</th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Enabled</th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Channels</th>
                      <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Roles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((cmd) => (
                      <tr key={cmd.name} className="border-b border-border last:border-0">
                        <td className="px-4 py-2.5">
                          <span className="font-mono text-primary">{cmd.name}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <Toggle label="" defaultChecked={cmd.enabled} />
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex flex-wrap gap-1">
                            {cmd.channels.length > 0 ? (
                              cmd.channels.map((ch) => (
                                <Badge key={ch} variant="muted">{ch}</Badge>
                              ))
                            ) : (
                              <span className="text-xs text-muted-foreground">All channels</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="flex flex-wrap gap-1">
                            {cmd.roles.length > 0 ? (
                              cmd.roles.map((role) => (
                                <Badge key={role} variant="default">{role}</Badge>
                              ))
                            ) : (
                              <span className="text-xs text-muted-foreground">Everyone</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }}
        </Tabs>
      </Card>
    </div>
  );
}
