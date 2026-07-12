"use client";

import { Gamepad2, DollarSign, Trophy, TrendingUp, Bomb, Circle, Dice5, CircleDot, BarChart3, Bird, Diamond, Spade } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/ui/stat-card";

const games = [
  { name: "Mines", description: "Reveal gems, avoid mines", icon: "💣", href: "/economy/games/mines" },
  { name: "Plinko", description: "Drop balls through pegs", icon: "🔵", href: "/economy/games/plinko" },
  { name: "Dice", description: "Roll the dice and bet", icon: "🎲", href: "/economy/games/dice" },
  { name: "Roulette", description: "Spin the wheel", icon: "🎰", href: "/economy/games/roulette" },
  { name: "Higher Lower", description: "Guess the next card", icon: "📊", href: "/economy/games/hilo" },
  { name: "Chicken Road", description: "Cross the road", icon: "🐔", href: "/economy/games/chicken" },
  { name: "Keno", description: "Find hidden crystals", icon: "💎", href: "/economy/games/keno" },
  { name: "Blackjack", description: "Beat the dealer to 21", icon: "🃏", href: "/economy/games/blackjack" },
];

export default function GamesPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Games</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard
          icon={<DollarSign className="h-4 w-4" />}
          label="Total Wagered"
          value="$142,500"
        />
        <StatCard
          icon={<Gamepad2 className="h-4 w-4" />}
          label="Games Played"
          value="1,847"
        />
        <StatCard
          icon={<Trophy className="h-4 w-4" />}
          label="Biggest Win"
          value="$8,500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {games.map((game) => (
          <Card key={game.name} className="group transition-colors hover:border-primary/30">
            <CardContent className="flex flex-col items-center gap-3 p-6">
              <span className="text-3xl">{game.icon}</span>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">{game.name}</p>
                <p className="text-xs text-muted-foreground">{game.description}</p>
              </div>
              <Button href={game.href} size="sm" className="w-full">
                Play
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
