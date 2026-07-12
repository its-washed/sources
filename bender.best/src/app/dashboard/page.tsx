"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockServers = [
  { id: "1", name: "Gaming Hub", members: 12450, color: "#5865F2" },
  { id: "2", name: "Music Lounge", members: 3200, color: "#EB459E" },
  { id: "3", name: "Art Community", members: 890, color: "#FEE75C" },
  { id: "4", name: "Tech Talk", members: 5600, color: "#57F287" },
  { id: "5", name: "Anime World", members: 15000, color: "#ED4245" },
  { id: "6", name: "Study Group", members: 420, color: "#9B59B6" },
];

export default function DashboardPage() {
  const [search, setSearch] = useState("");

  const filtered = mockServers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Your Servers</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search servers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-secondary border-border rounded-lg px-3 py-2 pl-10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((server) => (
          <Card key={server.id} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white"
                style={{ backgroundColor: server.color }}
              >
                {server.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-card-foreground">
                  {server.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  {server.members.toLocaleString()} members
                </div>
              </div>
            </div>
            <Link href={`/dashboard/${server.id}`}>
              <Button variant="primary" size="sm" className="w-full">
                Manage
              </Button>
            </Link>
          </Card>
        ))}

        <Card className="flex flex-col items-center justify-center gap-3 border-dashed py-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Add Server</p>
          <Button variant="ghost" size="sm">
            Invite Bender
          </Button>
        </Card>
      </div>
    </div>
  );
}
