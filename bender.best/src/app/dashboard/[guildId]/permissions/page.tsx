"use client";

import { use } from "react";
import { Key } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const roles = [
  { name: "@Admin", color: "#ED4245", permissions: { moderation: true, economy: true, music: true, tickets: true, leveling: true, settings: true } },
  { name: "@Moderator", color: "#5865F2", permissions: { moderation: true, economy: false, music: false, tickets: true, leveling: false, settings: false } },
  { name: "@VIP", color: "#FEE75C", permissions: { moderation: false, economy: true, music: true, tickets: false, leveling: false, settings: false } },
  { name: "@Member", color: "#57F287", permissions: { moderation: false, economy: false, music: false, tickets: false, leveling: false, settings: false } },
];

const permCategories = ["moderation", "economy", "music", "tickets", "leveling", "settings"] as const;

export default function PermissionsPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Key className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Permissions</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role-Based Permissions</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Role</th>
                {permCategories.map((cat) => (
                  <th key={cat} className="px-4 py-2.5 text-center font-medium text-muted-foreground capitalize">
                    {cat}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.name} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium"
                      style={{ backgroundColor: `${role.color}20`, color: role.color }}
                    >
                      {role.name}
                    </span>
                  </td>
                  {permCategories.map((cat) => (
                    <td key={cat} className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        defaultChecked={role.permissions[cat]}
                        className="h-4 w-4 rounded border-border bg-secondary accent-primary"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  );
}
