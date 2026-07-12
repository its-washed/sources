"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown, Minus, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export default function HiLoPage() {
  const [betAmount, setBetAmount] = useState("100");
  const [multiplier, setMultiplier] = useState(1.0);
  const [profit, setProfit] = useState(0);

  const cardHistory = [
    { value: "5", suit: "♦" },
    { value: "9", suit: "♣" },
    { value: "K", suit: "♥" },
  ];

  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Higher Lower</h1>
      <p className="text-sm text-muted-foreground">Guess if the next card will be higher or lower.</p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="flex flex-col gap-4 p-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Bet Amount</label>
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Multiplier</p>
                  <p className="text-lg font-bold text-primary">{multiplier.toFixed(2)}x</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Profit</p>
                  <p className="text-lg font-bold text-success">+${profit.toFixed(0)}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full" disabled={profit === 0}>
                <DollarSign className="h-4 w-4" />
                Cash Out
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="mb-2 text-sm font-medium text-foreground">Card History</p>
              <div className="flex flex-col gap-1.5">
                {cardHistory.map((card, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{card.value}{card.suit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col items-center gap-6 lg:col-span-2">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center gap-6 p-8">
              <p className="text-sm text-muted-foreground">Current Card</p>
              <div className="flex h-40 w-28 items-center justify-center rounded-xl border-2 border-border bg-card shadow-lg">
                <div className="text-center">
                  <p className="text-3xl font-bold text-foreground">7</p>
                  <p className="text-2xl text-red-400">♥</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button size="lg" variant="default">
                  <ArrowUp className="h-5 w-5" />
                  Higher
                </Button>
                <Button size="lg" variant="outline">
                  <Minus className="h-5 w-5" />
                  Tie
                </Button>
                <Button size="lg" variant="destructive">
                  <ArrowDown className="h-5 w-5" />
                  Lower
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
