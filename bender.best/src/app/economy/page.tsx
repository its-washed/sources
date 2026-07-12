"use client";

import {
  Wallet,
  TrendingUp,
  Target,
  Trophy,
  Clock,
  Flame,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Bomb,
  Dice5,
  Spade,
  CircleDot,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/ui/stat-card";

const stats = [
  { icon: <DollarSign className="h-4 w-4" />, label: "Total Wagered", value: "$142,500" },
  { icon: <TrendingUp className="h-4 w-4" />, label: "Profit/Loss", value: "+$12,350", iconColor: "bg-success/20 text-success" },
  { icon: <Target className="h-4 w-4" />, label: "Win Rate", value: "62.3%" },
  { icon: <Trophy className="h-4 w-4" />, label: "Total Bets", value: "1,847" },
  { icon: <ArrowUpRight className="h-4 w-4" />, label: "Biggest Win", value: "$8,500", iconColor: "bg-success/20 text-success" },
  { icon: <Flame className="h-4 w-4" />, label: "Best Multiplier", value: "24.5x" },
];

const recentTransactions = [
  { action: "Won Blackjack", amount: "+$2,400", time: "2 min ago", positive: true },
  { action: "Bet on Roulette", amount: "-$500", time: "15 min ago", positive: false },
  { action: "Collected Business", amount: "+$450", time: "1 hr ago", positive: true },
  { action: "Opened Standard Case", amount: "-$1,000", time: "3 hr ago", positive: false },
  { action: "6h Bonus Claimed", amount: "+$750", time: "4 hr ago", positive: true },
];

const quickGames = [
  { name: "Mines", icon: <Bomb className="h-5 w-5" />, href: "/economy/games/mines" },
  { name: "Dice", icon: <Dice5 className="h-5 w-5" />, href: "/economy/games/dice" },
  { name: "Blackjack", icon: <Spade className="h-5 w-5" />, href: "/economy/games/blackjack" },
  { name: "Roulette", icon: <CircleDot className="h-5 w-5" />, href: "/economy/games/roulette" },
];

export default function EconomyOverviewPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Wallet className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-3xl font-bold text-foreground">$24,850</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge>Level 12</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Bonuses</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Hourly Bonus</p>
                  <p className="text-xs text-muted-foreground">+$120</p>
                </div>
              </div>
              <Button size="sm">Claim</Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">6h Bonus</p>
                  <p className="text-xs text-muted-foreground">+$750</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">3h 24m remaining</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Daily Bonus</p>
                  <p className="text-xs text-muted-foreground">+$2,500</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">14h 30m remaining</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Daily Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                  i < 7
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
            ))}
            <Badge className="ml-3">Day 7</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            iconColor={stat.iconColor ?? "bg-primary/20 text-primary"}
          />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <div className="flex flex-col divide-y divide-border">
          {recentTransactions.map((tx, i) => (
            <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <span className="text-sm text-card-foreground">{tx.action}</span>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${tx.positive ? "text-success" : "text-destructive"}`}>
                  {tx.amount}
                </span>
                <span className="text-xs text-muted-foreground">{tx.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Quick Play</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {quickGames.map((game) => (
            <Button
              key={game.name}
              href={game.href}
              variant="outline"
              className="h-auto flex-col gap-2 py-6"
            >
              {game.icon}
              <span>{game.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
