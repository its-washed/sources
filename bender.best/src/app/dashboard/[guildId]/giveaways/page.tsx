"use client";

import { use } from "react";
import { PartyPopper, Clock, Trophy } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const activeGiveaways = [
  { name: "Nitro Giveaway", entries: 42, endsIn: "2h 15m", status: "active" },
  { name: "VIP Role", entries: 128, endsIn: "Ended", winner: "Sarah", status: "ended" },
];

const draftGiveaways = [
  { name: "Steam Key", entries: 0, status: "draft" },
];

const completedGiveaways = [
  { name: "Discord Nitro", winner: "CoolGamer", entries: 256, date: "Apr 28" },
  { name: "Custom Role", winner: "MusicFan", entries: 89, date: "Apr 25" },
  { name: "Steam Key", winner: "ProPlayer", entries: 312, date: "Apr 20" },
];

export default function GiveawaysPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PartyPopper className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Giveaways</h1>
        </div>
        <Button variant="primary">Create Giveaway</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Giveaways</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {activeGiveaways.map((g) => (
            <div
              key={g.name}
              className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <PartyPopper className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{g.name}</p>
                  <p className="text-xs text-muted-foreground">{g.entries} entries</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {g.status === "active" ? (
                  <Badge variant="success">
                    <Clock className="mr-1 h-3 w-3" />
                    {g.endsIn}
                  </Badge>
                ) : (
                  <div className="flex items-center gap-2">
                    <Badge variant="muted">Ended</Badge>
                    <Badge variant="default">
                      <Trophy className="mr-1 h-3 w-3" />
                      {g.winner}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Draft Giveaways</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {draftGiveaways.map((g) => (
            <div
              key={g.name}
              className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <PartyPopper className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{g.name}</p>
                  <p className="text-xs text-muted-foreground">Not started</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="muted">Draft</Badge>
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="primary" size="sm">Start</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed Giveaways</CardTitle>
        </CardHeader>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Giveaway</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Winner</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Entries</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {completedGiveaways.map((g) => (
                <tr key={g.name} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 text-foreground">{g.name}</td>
                  <td className="px-4 py-2.5 text-primary">{g.winner}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{g.entries}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{g.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
