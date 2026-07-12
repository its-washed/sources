"use client";

import { Trophy, Search, Medal, Building2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";

const topUsers = [
  { rank: 1, name: "goldking", balance: "$2,450,000", networth: "$5,200,000" },
  { rank: 2, name: "shadowwolf", balance: "$1,890,000", networth: "$3,800,000" },
  { rank: 3, name: "nova_star", balance: "$1,250,000", networth: "$2,900,000" },
  { rank: 4, name: "ironforge", balance: "$980,000", networth: "$2,100,000" },
  { rank: 5, name: "curet", balance: "$24,850", networth: "$142,500" },
  { rank: 6, name: "phantom_x", balance: "$15,200", networth: "$85,000" },
  { rank: 7, name: "blazeking", balance: "$8,500", networth: "$42,000" },
  { rank: 8, name: "frostbyte", balance: "$4,200", networth: "$22,000" },
  { rank: 9, name: "zenithpro", balance: "$1,800", networth: "$12,500" },
  { rank: 10, name: "cyberpunk99", balance: "$500", networth: "$5,000" },
];

const topCompanies = [
  { rank: 1, name: "Shadow Corp", tag: "SHAD", level: 7, reputation: 2400, votes: 156, members: 18 },
  { rank: 2, name: "Nova Syndicate", tag: "NOVA", level: 5, reputation: 1800, votes: 98, members: 12 },
  { rank: 3, name: "Vibrance Inc.", tag: "VIBR", level: 4, reputation: 850, votes: 62, members: 8 },
  { rank: 4, name: "Apex Legends", tag: "APEX", level: 3, reputation: 520, votes: 35, members: 8 },
  { rank: 5, name: "Iron Forge", tag: "IRON", level: 2, reputation: 280, votes: 18, members: 5 },
  { rank: 6, name: "Frost Clan", tag: "FROS", level: 2, reputation: 150, votes: 12, members: 4 },
  { rank: 7, name: "Blaze Empire", tag: "BLAZ", level: 1, reputation: 90, votes: 8, members: 3 },
  { rank: 8, name: "Zenith Group", tag: "ZEN", level: 1, reputation: 60, votes: 5, members: 3 },
  { rank: 9, name: "Phantom Ops", tag: "PHNT", level: 1, reputation: 35, votes: 3, members: 2 },
  { rank: 10, name: "Cyber Hub", tag: "CYBR", level: 1, reputation: 15, votes: 1, members: 2 },
];

const rankBadge = (rank: number) => {
  if (rank === 1) return <Badge className="bg-yellow-500/20 text-yellow-400">🥇 1st</Badge>;
  if (rank === 2) return <Badge className="bg-gray-400/20 text-gray-300">🥈 2nd</Badge>;
  if (rank === 3) return <Badge className="bg-amber-700/20 text-amber-600">🥉 3rd</Badge>;
  return <Badge variant="outline">{rank}th</Badge>;
};

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>

      <Tabs
        tabs={[
          { value: "users", label: "Users" },
          { value: "companies", label: "Companies" },
        ]}
      >
        {(activeTab) =>
          activeTab === "users" ? (
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="h-10 w-full rounded-lg border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Card>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <th className="pb-3 pr-4">Rank</th>
                      <th className="pb-3 pr-4">User</th>
                      <th className="pb-3 pr-4">Balance</th>
                      <th className="pb-3">Networth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topUsers.map((user) => (
                      <tr key={user.rank} className="border-b border-border last:border-0">
                        <td className="py-3.5 pr-4">{rankBadge(user.rank)}</td>
                        <td className="py-3.5 pr-4 text-sm font-medium text-foreground">{user.name}</td>
                        <td className="py-3.5 pr-4 text-sm text-muted-foreground">{user.balance}</td>
                        <td className="py-3.5 text-sm text-success">{user.networth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name or tag..."
                  className="h-10 w-full rounded-lg border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Card>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <th className="pb-3 pr-4">Rank</th>
                      <th className="pb-3 pr-4">Company</th>
                      <th className="pb-3 pr-4">Level</th>
                      <th className="pb-3 pr-4">Reputation</th>
                      <th className="pb-3 pr-4">Votes</th>
                      <th className="pb-3">Members</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCompanies.map((company) => (
                      <tr key={company.rank} className="border-b border-border last:border-0">
                        <td className="py-3.5 pr-4">{rankBadge(company.rank)}</td>
                        <td className="py-3.5 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">{company.name}</span>
                            <Badge variant="outline">{company.tag}</Badge>
                          </div>
                        </td>
                        <td className="py-3.5 pr-4 text-sm text-muted-foreground">{company.level}</td>
                        <td className="py-3.5 pr-4 text-sm text-primary">{company.reputation}</td>
                        <td className="py-3.5 pr-4 text-sm text-muted-foreground">{company.votes}</td>
                        <td className="py-3.5 text-sm text-muted-foreground">{company.members}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )
        }
      </Tabs>
    </div>
  );
}
