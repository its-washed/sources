"use client";

import { use } from "react";
import { UserPlus, Users, AlertTriangle, LogOut } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

const topInviters = [
  { rank: 1, user: "ProInviter", regular: 450, left: 32, fake: 12, bonus: 50, total: 500 },
  { rank: 2, user: "SocialKing", regular: 320, left: 28, fake: 8, bonus: 30, total: 370 },
  { rank: 3, user: "Recruiter", regular: 280, left: 45, fake: 5, bonus: 20, total: 325 },
  { rank: 4, user: "NetworkPro", regular: 210, left: 18, fake: 3, bonus: 15, total: 238 },
  { rank: 5, user: "FriendlyFace", regular: 180, left: 22, fake: 2, bonus: 10, total: 208 },
];

export default function InvitesPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <UserPlus className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Invite Tracker</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Users className="h-5 w-5" />} label="Total Invites" value="2,450" />
        <StatCard icon={<UserPlus className="h-5 w-5" />} label="Real" value="2,100" />
        <StatCard icon={<AlertTriangle className="h-5 w-5" />} label="Fake" value="150" />
        <StatCard icon={<LogOut className="h-5 w-5" />} label="Left" value="200" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Inviters</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">#</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">User</th>
                <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Regular</th>
                <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Left</th>
                <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Fake</th>
                <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Bonus</th>
                <th className="px-4 py-2.5 text-center font-medium text-muted-foreground">Total</th>
              </tr>
            </thead>
            <tbody>
              {topInviters.map((inv) => (
                <tr key={inv.rank} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 text-foreground">
                    {inv.rank <= 3 ? (
                      <Badge variant={inv.rank === 1 ? "warning" : "default"}>
                        #{inv.rank}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">#{inv.rank}</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 font-medium text-foreground">{inv.user}</td>
                  <td className="px-4 py-2.5 text-center text-success">{inv.regular}</td>
                  <td className="px-4 py-2.5 text-center text-destructive">{inv.left}</td>
                  <td className="px-4 py-2.5 text-center text-yellow-300">{inv.fake}</td>
                  <td className="px-4 py-2.5 text-center text-primary">{inv.bonus}</td>
                  <td className="px-4 py-2.5 text-center font-bold text-foreground">{inv.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invite Settings</CardTitle>
        </CardHeader>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Fake Invite Threshold
            </label>
            <input
              type="number"
              defaultValue={3}
              className="bg-secondary border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring max-w-xs"
            />
          </div>
          <Toggle label="Log Invites" defaultChecked={true} />
          <Toggle label="Role Rewards for Invites" defaultChecked={true} />
        </div>
      </Card>
    </div>
  );
}
