"use client";

import { use } from "react";
import { Bell, Play, MonitorPlay, Music2, Camera, AtSign } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const platforms = [
  { name: "YouTube", icon: <Play className="h-5 w-5 text-red-500" />, subs: 2, channels: ["MrBeast", "TechWithTim"], enabled: true },
  { name: "Twitch", icon: <MonitorPlay className="h-5 w-5 text-purple-400" />, subs: 1, channels: ["xQc"], enabled: true },
  { name: "TikTok", icon: <Music2 className="h-5 w-5 text-pink-400" />, subs: 1, channels: ["khaby.lame"], enabled: true },
  { name: "Kick", icon: <Bell className="h-5 w-5 text-green-400" />, subs: 0, channels: [], enabled: false },
  { name: "Instagram", icon: <Camera className="h-5 w-5 text-orange-400" />, subs: 1, channels: ["nasa"], enabled: true },
  { name: "X / Twitter", icon: <AtSign className="h-5 w-5 text-sky-400" />, subs: 1, channels: ["elonmusk"], enabled: true },
];

export default function SocialPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Bell className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Social Alerts</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {platforms.map((platform) => (
          <Card key={platform.name}>
            <CardHeader>
              <div className="flex items-center gap-2">
                {platform.icon}
                <CardTitle>{platform.name}</CardTitle>
              </div>
              <Toggle label="" defaultChecked={platform.enabled} />
            </CardHeader>
            <div className="space-y-3">
              {platform.channels.length > 0 ? (
                platform.channels.map((ch) => (
                  <div
                    key={ch}
                    className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2"
                  >
                    <span className="text-sm text-foreground">{ch}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Active</Badge>
                      <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No subscriptions</p>
              )}
              <div className="flex items-center justify-between">
                <Badge variant="muted">{platform.subs} subscription{platform.subs !== 1 ? "s" : ""}</Badge>
                <Button variant="ghost" size="sm">
                  + Add Subscription
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
