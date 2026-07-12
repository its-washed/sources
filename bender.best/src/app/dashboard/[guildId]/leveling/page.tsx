"use client";

import { use } from "react";
import { TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const roleRewards = [
  { level: 5, role: "@Bronze", color: "#CD7F32" },
  { level: 10, role: "@Silver", color: "#C0C0C0" },
  { level: 20, role: "@Gold", color: "#FFD700" },
  { level: 50, role: "@Diamond", color: "#B9F2FF" },
];

const xpBoosts = [
  { role: "@VIP", multiplier: "2x", schedule: "Always" },
  { role: "@Event Winner", multiplier: "1.5x", schedule: "Weekends" },
];

export default function LevelingPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Leveling</h1>
        </div>
        <Toggle label="" defaultChecked={true} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Text XP</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              XP per Message
            </label>
            <input
              type="number"
              defaultValue={15}
              className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Cooldown (seconds)
            </label>
            <input
              type="number"
              defaultValue={5}
              className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full"
            />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Voice XP</CardTitle>
        </CardHeader>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
            XP per Minute
          </label>
          <input
            type="number"
            defaultValue={5}
            className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full max-w-xs"
          />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Level-up Message</CardTitle>
        </CardHeader>
        <textarea
          defaultValue="🎉 Congratulations {user}, you reached level {level}!"
          rows={3}
          className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full resize-none"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Available variables: {"{user}"}, {"{level}"}, {"{user.mention}"}
        </p>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Rewards</CardTitle>
          <Button variant="primary" size="sm">
            Add Reward
          </Button>
        </CardHeader>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Level</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Role</th>
                <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roleRewards.map((reward) => (
                <tr key={reward.level} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 text-foreground">Level {reward.level}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium"
                      style={{ backgroundColor: `${reward.color}20`, color: reward.color }}
                    >
                      {reward.role}
                    </span>
                  </td>
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
          <CardTitle>XP Boosts</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {xpBoosts.map((boost) => (
            <div
              key={boost.role}
              className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Badge variant="default">{boost.multiplier}</Badge>
                <span className="text-sm font-medium text-foreground">{boost.role}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{boost.schedule}</span>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
        </CardHeader>
        <Toggle label="Public Leaderboard" defaultChecked={true} />
      </Card>

      <div className="flex justify-end">
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  );
}
