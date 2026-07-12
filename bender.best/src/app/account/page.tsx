"use client";

import {
  User,
  Wallet,
  TrendingUp,
  Target,
  Trophy,
  Crown,
  Clock,
  Gift,
  ShoppingBag,
  FlaskConical,
  Package,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";

const recentActivity = [
  { icon: <Gift className="h-4 w-4 text-primary" />, text: "Claimed daily bonus", time: "2 hours ago" },
  { icon: <Trophy className="h-4 w-4 text-success" />, text: "Won $500 in Blackjack", time: "5 hours ago" },
  { icon: <ShoppingBag className="h-4 w-4 text-warning" />, text: "Bought Coffee Shop business", time: "1 day ago" },
  { icon: <FlaskConical className="h-4 w-4 text-primary" />, text: "Collected lab earnings", time: "1 day ago" },
  { icon: <Package className="h-4 w-4 text-destructive" />, text: "Opened Standard Case", time: "2 days ago" },
];

export default function AccountOverviewPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-muted">
          <User className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">curet</h1>
            <span className="text-lg text-muted-foreground">#0001</span>
            <Badge variant="default">
              <Crown className="mr-1 h-3 w-3" />
              Premium
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Member since Jan 15, 2024
            </span>
            <span>Discord ID: 123456789012345678</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={<Wallet className="h-4 w-4" />}
          label="Balance"
          value="$24,850"
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Level"
          value="12"
        />
        <StatCard
          icon={<Target className="h-4 w-4" />}
          label="Total Wagered"
          value="$142,500"
        />
        <StatCard
          icon={<Trophy className="h-4 w-4" />}
          label="Win Rate"
          value="62.3%"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <div className="flex flex-col divide-y divide-border">
          {recentActivity.map((activity, i) => (
            <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                {activity.icon}
                <span className="text-sm text-card-foreground">{activity.text}</span>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}


