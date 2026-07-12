"use client";

import { use } from "react";
import { Mic, Users, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const hubChannels = [
  { name: "Create VC", category: "Voice Channels" },
  { name: "Join VC", category: "Voice Channels" },
];

const activeChannels = [
  { name: "visics's channel", users: 3, hub: "Create VC" },
  { name: "chill zone", users: 5, hub: "Create VC" },
  { name: "gaming", users: 2, hub: "Join VC" },
];

export default function TempVoicePage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Mic className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Temp Voice</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hub Channels</CardTitle>
          <Button variant="primary" size="sm">Add Hub</Button>
        </CardHeader>
        <div className="space-y-3">
          {hubChannels.map((hub) => (
            <div
              key={hub.name}
              className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{hub.name}</p>
                <p className="text-xs text-muted-foreground">Category: {hub.category}</p>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Temporary Channels</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {activeChannels.map((ch) => (
            <div
              key={ch.name}
              className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Mic className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{ch.name}</p>
                  <p className="text-xs text-muted-foreground">Hub: {ch.hub}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="default">
                  <Users className="mr-1 h-3 w-3" />
                  {ch.users}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <Toggle label="Auto-cleanup empty channels" defaultChecked={true} />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Name Template
            </label>
            <input
              type="text"
              defaultValue="{user}'s channel"
              className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full max-w-sm"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Max Channels per Hub
            </label>
            <input
              type="number"
              defaultValue={10}
              className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring max-w-xs"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Blacklisted Roles
            </label>
            <div className="flex flex-wrap gap-2">
              <Badge variant="destructive">@Muted</Badge>
              <Badge variant="destructive">@Jailed</Badge>
              <Button variant="ghost" size="sm">+ Add</Button>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interface Customization</CardTitle>
        </CardHeader>
        <div className="flex flex-wrap gap-3">
          <Button variant="default" size="sm">Rename Channel</Button>
          <Button variant="default" size="sm">Set User Limit</Button>
          <Button variant="default" size="sm">Lock Channel</Button>
          <Button variant="default" size="sm">Kick User</Button>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  );
}
