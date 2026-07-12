"use client";

import { use } from "react";
import { Settings2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

export default function SettingsPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings2 className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Server Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Language</label>
            <select className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm w-full">
              <option>English</option>
              <option>German</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Timezone</label>
            <select className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm w-full">
              <option>UTC</option>
              <option>EST (UTC-5)</option>
              <option>PST (UTC-8)</option>
              <option>CET (UTC+1)</option>
              <option>JST (UTC+9)</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bot Configuration</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Bot Prefix</label>
            <input
              type="text"
              defaultValue="!"
              className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Log Channel</label>
            <select className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm w-full">
              <option>#mod-logs</option>
              <option>#server-logs</option>
              <option>#bot-logs</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Greetings</CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <Toggle label="Welcome Messages" defaultChecked={true} />
          <Toggle label="Goodbye Messages" defaultChecked={true} />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Server Appearance</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Server Icon</label>
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50">
              <div className="text-center">
                <div className="mb-1 text-3xl font-bold text-muted-foreground">GH</div>
                <p className="text-xs text-muted-foreground">No icon uploaded</p>
              </div>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Server Banner</label>
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50">
              <p className="text-xs text-muted-foreground">No banner uploaded</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  );
}
