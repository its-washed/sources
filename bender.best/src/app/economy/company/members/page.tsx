"use client";

import { Users, UserPlus, Shield, ChevronUp, ChevronDown, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const members = [
  { name: "curet", role: "CEO", joined: "Jan 1, 2026" },
  { name: "shadowwolf", role: "Manager", joined: "Jan 5, 2026" },
  { name: "nova_star", role: "Manager", joined: "Jan 10, 2026" },
  { name: "ironforge", role: "Senior", joined: "Feb 1, 2026" },
  { name: "phantom_x", role: "Senior", joined: "Feb 15, 2026" },
  { name: "blazeking", role: "Member", joined: "Mar 1, 2026" },
  { name: "frostbyte", role: "Member", joined: "Mar 10, 2026" },
  { name: "zenithpro", role: "Member", joined: "Mar 20, 2026" },
];

const joinRequests = [
  { name: "cyberpunk99", date: "Apr 28, 2026" },
  { name: "neonrider", date: "Apr 29, 2026" },
];

const roleVariant: Record<string, "default" | "secondary" | "outline"> = {
  CEO: "default",
  Manager: "secondary",
  Senior: "outline",
  Member: "outline",
};

export default function CompanyMembersPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Company Members</h1>
        <Button size="sm">
          <UserPlus className="h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Members (8/25)</CardTitle>
        </CardHeader>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="pb-3 pr-4">Name</th>
              <th className="pb-3 pr-4">Role</th>
              <th className="pb-3 pr-4">Joined</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.name} className="border-b border-border last:border-0">
                <td className="py-3.5 pr-4 text-sm font-medium text-foreground">{member.name}</td>
                <td className="py-3.5 pr-4">
                  <Badge variant={roleVariant[member.role]}>{member.role}</Badge>
                </td>
                <td className="py-3.5 pr-4 text-sm text-muted-foreground">{member.joined}</td>
                <td className="py-3.5">
                  <div className="flex items-center gap-1">
                    {member.role !== "CEO" && (
                      <>
                        <Button size="sm" variant="ghost" title="Promote">
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="Demote">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" title="Kick">
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Join Requests ({joinRequests.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {joinRequests.map((req) => (
            <div
              key={req.name}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{req.name}</p>
                <p className="text-xs text-muted-foreground">{req.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  Accept
                </Button>
                <Button size="sm" variant="destructive">
                  Deny
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
