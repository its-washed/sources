"use client";

import { use } from "react";
import { Gavel } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const warningThresholds = [
  { warnings: 3, action: "Mute", duration: "1h" },
  { warnings: 5, action: "Kick", duration: "—" },
  { warnings: 10, action: "Ban", duration: "—" },
];

export default function ModerationPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Gavel className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Moderation</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Auto Moderation</CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <Toggle label="Auto-mod" defaultChecked={true} />
          <Toggle label="Spam Filter" defaultChecked={true} />
          <Toggle label="Link Filter" defaultChecked={false} />
          <Toggle label="Raid Protection" defaultChecked={true} />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Punishment Defaults</CardTitle>
        </CardHeader>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
            Default Mute Duration
          </label>
          <select className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm max-w-xs">
            <option>5 minutes</option>
            <option>15 minutes</option>
            <option>30 minutes</option>
            <option>1 hour</option>
            <option>6 hours</option>
            <option>24 hours</option>
          </select>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Warning Thresholds</CardTitle>
          <Button variant="primary" size="sm">
            Add Threshold
          </Button>
        </CardHeader>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Warnings</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Action</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Duration</th>
                <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {warningThresholds.map((threshold) => (
                <tr key={threshold.warnings} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 text-foreground">{threshold.warnings} warnings</td>
                  <td className="px-4 py-2.5">
                    <Badge
                      variant={
                        threshold.action === "Ban"
                          ? "destructive"
                          : threshold.action === "Kick"
                          ? "warning"
                          : "default"
                      }
                    >
                      {threshold.action}
                    </Badge>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{threshold.duration}</td>
                  <td className="px-4 py-2.5 text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Immune Roles</CardTitle>
        </CardHeader>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">@Admin</Badge>
          <Badge variant="default">@Moderator</Badge>
          <Button variant="ghost" size="sm">
            + Add Role
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification & Logging</CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <Toggle label="DM on Punishment" defaultChecked={true} />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Log Channel
            </label>
            <select className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm max-w-xs">
              <option>#mod-logs</option>
              <option>#server-logs</option>
              <option>#punishments</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  );
}
