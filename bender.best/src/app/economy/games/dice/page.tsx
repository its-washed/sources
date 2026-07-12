"use client";

import { useState } from "react";
import { Dice5 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const recentRolls = [
  { target: 45, condition: "Under", result: 23, won: true, payout: "$222" },
  { target: 75, condition: "Over", result: 82, won: true, payout: "$133" },
  { target: 30, condition: "Under", result: 55, won: false, payout: "$0" },
  { target: 60, condition: "Over", result: 71, won: true, payout: "$166" },
  { target: 50, condition: "Under", result: 62, won: false, payout: "$0" },
];

export default function DicePage() {
  const [betAmount, setBetAmount] = useState("100");
  const [target, setTarget] = useState(50);
  const [condition, setCondition] = useState<"under" | "over">("under");

  const winChance = condition === "under" ? target : 100 - target;
  const multiplier = (100 / winChance).toFixed(2);

  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Dice</h1>
      <p className="text-sm text-muted-foreground">Roll the dice and bet on the outcome.</p>

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
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Condition</label>
                <div className="flex gap-2">
                  <Button
                    variant={condition === "under" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCondition("under")}
                    className="flex-1"
                  >
                    Under
                  </Button>
                  <Button
                    variant={condition === "over" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCondition("over")}
                    className="flex-1"
                  >
                    Over
                  </Button>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Target: {target}</label>
                <input
                  type="range"
                  min={2}
                  max={98}
                  value={target}
                  onChange={(e) => setTarget(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>2</span>
                  <span>98</span>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Multiplier</p>
                  <p className="text-lg font-bold text-primary">{multiplier}x</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Win Chance</p>
                  <p className="text-lg font-bold text-foreground">{winChance}%</p>
                </div>
              </div>
              <Button className="w-full">
                <Dice5 className="h-4 w-4" />
                Roll Dice
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <Card>
            <CardContent className="flex flex-col items-center gap-6 p-8">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-border bg-secondary">
                <div className="text-center">
                  <p className="text-4xl font-bold text-foreground">42</p>
                  <p className="text-xs text-muted-foreground">Result</p>
                </div>
              </div>
              <div className="flex w-full items-center gap-4">
                <div className="flex-1 rounded-lg bg-destructive/20 p-3 text-center">
                  <p className="text-xs text-destructive">Under {target}</p>
                  <p className="text-sm font-bold text-destructive">Lose</p>
                </div>
                <div className="flex-1 rounded-lg bg-success/20 p-3 text-center">
                  <p className="text-xs text-success">Over {target}</p>
                  <p className="text-sm font-bold text-success">Win</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="mb-3 text-sm font-medium text-foreground">Recent Rolls</p>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <th className="pb-2 pr-3">Target</th>
                    <th className="pb-2 pr-3">Condition</th>
                    <th className="pb-2 pr-3">Result</th>
                    <th className="pb-2 pr-3">Outcome</th>
                    <th className="pb-2">Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRolls.map((roll, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="py-2.5 pr-3 text-sm text-muted-foreground">{roll.target}</td>
                      <td className="py-2.5 pr-3 text-sm text-foreground">{roll.condition}</td>
                      <td className="py-2.5 pr-3 text-sm font-medium text-foreground">{roll.result}</td>
                      <td className="py-2.5 pr-3">
                        <span className={`text-sm font-medium ${roll.won ? "text-success" : "text-destructive"}`}>
                          {roll.won ? "Won" : "Lost"}
                        </span>
                      </td>
                      <td className={`py-2.5 text-sm font-medium ${roll.won ? "text-success" : "text-destructive"}`}>
                        {roll.payout}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
