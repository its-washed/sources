"use client";

import { Plus, Search, ArrowRight, Server } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const aliases = [
  { command: "/help", alias: "/h", server: "My Server" },
  { command: "/ban", alias: "/b", server: "Gaming Hub" },
  { command: "/mute", alias: "/m", server: "Gaming Hub" },
  { command: "/play", alias: "/p", server: "Music Lounge" },
  { command: "/clear", alias: "/c", server: "My Server" },
];

export default function AliasesPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Aliases</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search aliases..."
              className="h-9 w-56 rounded-lg border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Add Alias
          </button>
        </div>
      </div>

      <Card>
        <div className="flex flex-col divide-y divide-border">
          {aliases.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div className="flex items-center gap-4">
                <code className="rounded-md bg-secondary px-2.5 py-1 text-sm font-mono text-foreground">
                  {item.command}
                </code>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <code className="rounded-md bg-primary/15 px-2.5 py-1 text-sm font-mono text-primary">
                  {item.alias}
                </code>
              </div>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Server className="h-3.5 w-3.5" />
                {item.server}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
