"use client";

import { use } from "react";
import { Mail, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const messageTypes = [
  { type: "Welcome", count: 3, channel: "#welcome", enabled: true },
  { type: "Welcome DM", count: 1, channel: "DM", enabled: true },
  { type: "Goodbye", count: 2, channel: "#goodbye", enabled: true },
  { type: "Boost", count: 1, channel: "#announcements", enabled: true },
  { type: "Unboost", count: 1, channel: "#announcements", enabled: false },
];

export default function MessagesPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Mail className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Message Types</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {messageTypes.map((msg) => (
            <div
              key={msg.type}
              className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{msg.type}</p>
                    <Badge variant="default">{msg.count}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{msg.channel}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Toggle label="" defaultChecked={msg.enabled} />
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview — Welcome Message</CardTitle>
        </CardHeader>
        <div className="rounded-lg border border-border bg-secondary/30 p-4">
          <div className="max-w-md rounded-lg border border-border bg-card p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-full bg-primary/30" />
              <div>
                <p className="text-sm font-semibold text-foreground">Gaming Hub</p>
                <p className="text-xs text-muted-foreground">Today at 3:42 PM</p>
              </div>
            </div>
            <div className="border-l-4 border-primary pl-3">
              <p className="text-sm font-semibold text-primary-foreground">Welcome to Gaming Hub! 🎉</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Hey <span className="text-primary">@NewMember</span>, welcome to our community! Make sure to check out{" "}
                <span className="text-primary">#rules</span> and grab your roles in{" "}
                <span className="text-primary">#self-roles</span>.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">You are member #12,451</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
