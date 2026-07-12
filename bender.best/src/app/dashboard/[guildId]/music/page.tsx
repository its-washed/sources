"use client";

import { use } from "react";
import { Music, Volume2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const filters = [
  { name: "Bass Boost", enabled: false },
  { name: "Nightcore", enabled: false },
  { name: "Vaporwave", enabled: false },
  { name: "Pop", enabled: false },
  { name: "Radio", enabled: false },
  { name: "Treble", enabled: false },
  { name: "Flat", enabled: true },
  { name: "Karaoke", enabled: false },
];

export default function MusicPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Music className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Music</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Player Settings</CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              DJ Roles
            </label>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">@DJ</Badge>
              <Badge variant="default">@Moderator</Badge>
              <Button variant="ghost" size="sm">+ Add Role</Button>
            </div>
          </div>
          <Toggle label="Autoplay" defaultChecked={true} />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Default Volume
            </label>
            <div className="flex items-center gap-3">
              <Volume2 className="h-5 w-5 text-muted-foreground" />
              <div className="h-2 flex-1 max-w-xs overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: "70%" }} />
              </div>
              <span className="text-sm text-foreground">70%</span>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Exception Channels
            </label>
            <div className="flex flex-wrap gap-2">
              <Badge variant="muted">#music</Badge>
              <Badge variant="muted">#bot-commands</Badge>
              <Button variant="ghost" size="sm">+ Add</Button>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Queue Management</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Max Queue Length
            </label>
            <input
              type="number"
              defaultValue={50}
              className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Max Song Length (minutes)
            </label>
            <input
              type="number"
              defaultValue={30}
              className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full"
            />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audio Filters</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {filters.map((filter) => (
            <div
              key={filter.name}
              className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3"
            >
              <span className="text-sm font-medium text-foreground">{filter.name}</span>
              <Toggle label="" defaultChecked={filter.enabled} />
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  );
}
