"use client";

import { ShieldAlert, ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const punishments = [
  { type: "Warning", reason: "Spamming in general chat", server: "Gaming Hub", date: "Apr 20, 2026", status: "Expired" as const },
  { type: "Mute", reason: "Inappropriate language", server: "Music Lounge", date: "Mar 5, 2026", status: "Expired" as const },
  { type: "Warning", reason: "Off-topic discussion", server: "My Server", date: "Feb 18, 2026", status: "Active" as const },
  { type: "Ban", reason: "Repeated rule violations", server: "Gaming Hub", date: "Jan 22, 2026", status: "Active" as const },
  { type: "Mute", reason: "Excessive pings", server: "Community Zone", date: "Dec 30, 2025", status: "Expired" as const },
];

const typeVariant: Record<string, "default" | "warning" | "destructive"> = {
  Warning: "warning",
  Mute: "default",
  Ban: "destructive",
};

const statusVariant: Record<string, "destructive" | "muted"> = {
  Active: "destructive",
  Expired: "muted",
};

export default function PunishmentsPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Punishments</h1>
        <div className="relative">
          <select className="h-9 appearance-none rounded-lg border border-border bg-secondary pl-3 pr-8 text-sm text-foreground focus:border-primary focus:outline-none">
            <option>All Types</option>
            <option>Ban</option>
            <option>Mute</option>
            <option>Warning</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <Card>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="pb-3 pr-4">Type</th>
              <th className="pb-3 pr-4">Reason</th>
              <th className="pb-3 pr-4">Server</th>
              <th className="pb-3 pr-4">Date</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {punishments.map((p, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="py-3.5 pr-4">
                  <Badge variant={typeVariant[p.type]}>{p.type}</Badge>
                </td>
                <td className="py-3.5 pr-4 text-sm text-card-foreground">{p.reason}</td>
                <td className="py-3.5 pr-4 text-sm text-muted-foreground">{p.server}</td>
                <td className="py-3.5 pr-4 text-sm text-muted-foreground">{p.date}</td>
                <td className="py-3.5">
                  <Badge variant={statusVariant[p.status]}>{p.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
