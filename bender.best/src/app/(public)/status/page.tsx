"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import {
  Server,
  Users,
  Layers,
  Grid3X3,
  Database,
  HardDrive,
  Wifi,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const stats = [
  { icon: <Server className="h-5 w-5" />, label: "Total Servers", value: "80", iconColor: "bg-primary/20 text-primary" },
  { icon: <Users className="h-5 w-5" />, label: "Total Users", value: "163,642", iconColor: "bg-primary/20 text-primary" },
  { icon: <Layers className="h-5 w-5" />, label: "Total Clusters", value: "1", iconColor: "bg-primary/20 text-primary" },
  { icon: <Grid3X3 className="h-5 w-5" />, label: "Total Shards", value: "1", iconColor: "bg-primary/20 text-primary" },
];

const latencyStats = [
  { label: "Database", value: "15ms", icon: <Database className="h-5 w-5" />, iconColor: "bg-success/20 text-success" },
  { label: "Redis", value: "4ms", icon: <HardDrive className="h-5 w-5" />, iconColor: "bg-success/20 text-success" },
  { label: "Discord API", value: "24ms", icon: <Wifi className="h-5 w-5" />, iconColor: "bg-success/20 text-success" },
];

const shards = [
  { id: 0, status: "Online", servers: 80, users: "163,642", latency: "16ms", uptime: "5h 58m" },
];

export default function StatusPage() {
  const [clusterOpen, setClusterOpen] = useState(true);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">System Status</h1>
        <p className="mt-2 text-muted-foreground">Real-time overview of all bot shards and their health.</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {latencyStats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${s.iconColor}`}>
                {s.icon}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm text-muted-foreground">{s.label}</p>
                <p className="truncate text-xl font-bold text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={() => setClusterOpen(!clusterOpen)}
          className="flex w-full items-center justify-between rounded-xl border border-border/50 bg-card px-6 py-4 text-left transition-colors hover:bg-accent"
        >
          <div className="flex items-center gap-3">
            <Layers className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold text-foreground">Cluster #0</span>
            <Badge variant="success">{shards.length} shard{shards.length !== 1 ? "s" : ""}</Badge>
          </div>
          {clusterOpen ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </button>

        {clusterOpen && (
          <div className="mt-3 space-y-3">
            {shards.map((shard) => (
              <div
                key={shard.id}
                className="rounded-xl border border-border/50 bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Server className="h-5 w-5 text-primary" />
                    <span className="text-base font-semibold text-foreground">Shard #{shard.id}</span>
                  </div>
                  <Badge variant="success">{shard.status}</Badge>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Servers</p>
                    <p className="text-lg font-bold text-foreground">{shard.servers}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Users</p>
                    <p className="text-lg font-bold text-foreground">{shard.users}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Latency</p>
                    <p className="text-lg font-bold text-foreground">{shard.latency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Uptime</p>
                    <p className="text-lg font-bold text-foreground">{shard.uptime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
