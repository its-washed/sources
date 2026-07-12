"use client";

import { use } from "react";
import { Hash, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const counters = [
  { name: "Members", channel: "#general", type: "Members", value: "12,450" },
  { name: "Bots", channel: "#bot-commands", type: "Bots", value: "8" },
  { name: "Boosts", channel: "#info", type: "Boosts", value: "42" },
];

const counterTypes = ["Members", "Bots", "Boosts", "Channels", "Roles", "Online"];

export default function CountersPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Hash className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Counters</h1>
        </div>
        <Button variant="primary">Add Counter</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Counters</CardTitle>
        </CardHeader>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Channel</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Type</th>
                <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Value</th>
                <th className="px-4 py-2.5 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {counters.map((counter) => (
                <tr key={counter.name} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-medium text-foreground">{counter.name}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{counter.channel}</td>
                  <td className="px-4 py-2.5">
                    <Badge variant="default">{counter.type}</Badge>
                  </td>
                  <td className="px-4 py-2.5 text-primary font-mono">{counter.value}</td>
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
          <CardTitle>Available Counter Types</CardTitle>
        </CardHeader>
        <div className="flex flex-wrap gap-2">
          {counterTypes.map((type) => (
            <Badge key={type} variant="muted" className="px-3 py-1.5 text-sm">
              {type}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
