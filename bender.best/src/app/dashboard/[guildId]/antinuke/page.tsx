"use client";

import { use } from "react";
import { Shield } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const thresholds = [
  { action: "Role Delete", count: 3, period: "10s", punishment: "Ban" },
  { action: "Channel Delete", count: 5, period: "30s", punishment: "Ban" },
  { action: "Mass Ban", count: 4, period: "15s", punishment: "Ban" },
];

export default function AntinukePage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Antinuke</h1>
        </div>
        <Toggle label="" defaultChecked={true} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Threshold Configuration</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {thresholds.map((t) => (
            <div key={t.action} className="rounded-lg bg-secondary/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-medium text-foreground">{t.action}</span>
                <Badge variant="destructive">{t.punishment}</Badge>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Trigger Count</label>
                  <input
                    type="number"
                    defaultValue={t.count}
                    className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Time Period</label>
                  <input
                    type="text"
                    defaultValue={t.period}
                    className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Punishment</label>
                  <select className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm w-full">
                    <option>Ban</option>
                    <option>Kick</option>
                    <option>Mute</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Protections</CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <Toggle label="Vanity Theft Protection" defaultChecked={true} />
          <Toggle label="Bot Protection" defaultChecked={true} />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Whitelisted Roles</CardTitle>
        </CardHeader>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">@Admin</Badge>
          <Badge variant="default">@Co-Owner</Badge>
          <Button variant="ghost" size="sm">
            + Add Role
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logging</CardTitle>
        </CardHeader>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
            Log Channel
          </label>
          <select className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm max-w-xs">
            <option>#antinuke-logs</option>
            <option>#security-logs</option>
            <option>#mod-logs</option>
          </select>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  );
}
