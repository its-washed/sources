"use client";

import { use } from "react";
import Link from "next/link";
import { Users, Cake, Crown, UserCheck, Star, Lightbulb } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const subFeatures = [
  {
    name: "Birthdays",
    href: "community/birthdays",
    stat: "3 upcoming",
    icon: <Cake className="h-5 w-5 text-primary" />,
    description: "Celebrate member birthdays",
  },
  {
    name: "Booster Roles",
    href: "community/booster-roles",
    stat: "12 active",
    icon: <Crown className="h-5 w-5 text-purple-400" />,
    description: "Custom roles for boosters",
  },
  {
    name: "Auto Roles",
    href: "community/auto-roles",
    stat: "5 configured",
    icon: <UserCheck className="h-5 w-5 text-success" />,
    description: "Automatic role assignment",
  },
  {
    name: "Starboard",
    href: "community/starboard",
    stat: "142 starred",
    icon: <Star className="h-5 w-5 text-yellow-400" />,
    description: "Highlight best messages",
  },
  {
    name: "Suggestions",
    href: "community/suggestions",
    stat: "8 pending",
    icon: <Lightbulb className="h-5 w-5 text-warning" />,
    description: "Community feedback system",
  },
];

export default function CommunityPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  const { guildId } = use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Community</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={<Cake className="h-5 w-5" />} label="Birthdays" value="3" />
        <StatCard icon={<Crown className="h-5 w-5" />} label="Booster Roles" value="12" />
        <StatCard icon={<UserCheck className="h-5 w-5" />} label="Auto Roles" value="5" />
        <StatCard icon={<Star className="h-5 w-5" />} label="Starboard" value="142" />
        <StatCard icon={<Lightbulb className="h-5 w-5" />} label="Suggestions" value="8" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subFeatures.map((feature) => (
          <Link key={feature.name} href={`/dashboard/${guildId}/${feature.href}`}>
            <Card className="transition-colors hover:border-primary/50">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {feature.icon}
                  <div>
                    <CardTitle>{feature.name}</CardTitle>
                    <p className="mt-0.5 text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
                <Badge variant="default">{feature.stat}</Badge>
              </div>
              <div className="mt-3">
                <Button variant="ghost" size="sm">Configure →</Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
