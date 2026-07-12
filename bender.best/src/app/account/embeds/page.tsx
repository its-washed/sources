"use client";

import { Plus, Code } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const embeds = [
  {
    name: "welcome-message",
    color: "#57F287",
    title: "Welcome to the Server!",
    description: "We're glad to have you here. Make sure to read the rules and have fun!",
    created: "Feb 12, 2026",
  },
  {
    name: "rules",
    color: "#ED4245",
    title: "Server Rules",
    description: "Please follow these rules to keep the community safe and welcoming.",
    created: "Jan 5, 2026",
  },
  {
    name: "boost-thank",
    color: "#FEE75C",
    title: "Thanks for Boosting!",
    description: "Your support means the world to us. Enjoy your exclusive perks!",
    created: "Dec 20, 2025",
  },
];

export default function EmbedsPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Embeds</h1>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Create New Embed
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {embeds.map((embed) => (
          <Card key={embed.name} className="flex flex-col gap-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Code className="h-4 w-4 text-primary" />
                {embed.name}
              </CardTitle>
              <span className="text-xs text-muted-foreground">Created {embed.created}</span>
            </CardHeader>
            <div className="rounded-lg border border-border bg-secondary/50 p-4">
              <div
                className="mb-2 h-1 w-10 rounded-full"
                style={{ backgroundColor: embed.color }}
              />
              <p className="mb-1 text-sm font-semibold text-foreground">{embed.title}</p>
              <p className="text-xs leading-relaxed text-muted-foreground">{embed.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
