"use client";

import { useState } from "react";
import { CircleDot } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const riskMultipliers = {
  low: [5.5, 2.1, 1.1, 1, 0.7, 1, 1.1, 2.1, 5.5],
  medium: [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
  high: [170, 24, 5.2, 1.9, 0, 1.9, 5.2, 24, 170],
};

const recentDrops = [
  { result: "3x", risk: "Medium", bet: "$100", payout: "$300" },
  { result: "0.7x", risk: "Low", bet: "$200", payout: "$140" },
  { result: "13x", risk: "Medium", bet: "$50", payout: "$650" },
  { result: "0x", risk: "High", bet: "$150", payout: "$0" },
  { result: "5.5x", risk: "Low", bet: "$100", payout: "$550" },
];

export default function PlinkoPage() {
  const [betAmount, setBetAmount] = useState("100");
  const [risk, setRisk] = useState<"low" | "medium" | "high">("medium");
  const [ballCount, setBallCount] = useState(1);

  const multipliers = riskMultipliers[risk];

  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Plinko</h1>
      <p className="text-sm text-muted-foreground">Drop balls through pegs and land on a multiplier.</p>

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
                <label className="mb-1.5 block text-sm font-medium text-foreground">Risk</label>
                <div className="flex gap-2">
                  {(["low", "medium", "high"] as const).map((r) => (
                    <Button
                      key={r}
                      variant={risk === r ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRisk(r)}
                      className="flex-1 capitalize"
                    >
                      {r}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Balls</label>
                <div className="flex gap-2">
                  {[1, 3, 5, 10].map((count) => (
                    <Button
                      key={count}
                      variant={ballCount === count ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBallCount(count)}
                      className="flex-1"
                    >
                      {count}
                    </Button>
                  ))}
                </div>
              </div>
              <Button className="w-full">
                <CircleDot className="h-4 w-4" />
                Drop Ball
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <CircleDot className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col items-center">
                  {Array.from({ length: 8 }).map((_, row) => (
                    <div key={row} className="flex justify-center gap-3">
                      {Array.from({ length: row + 1 }).map((_, col) => (
                        <div
                          key={col}
                          className="my-0.5 h-2 w-2 rounded-full bg-muted-foreground/30"
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex w-full gap-1">
                  {multipliers.map((mult, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-md py-2 text-center text-xs font-bold ${
                        mult === 0
                          ? "bg-destructive/20 text-destructive"
                          : mult > 5
                          ? "bg-success/20 text-success"
                          : mult > 1
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {mult}x
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Recent Drops</CardTitle>
            </CardHeader>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <th className="pb-2 pr-3">Result</th>
                  <th className="pb-2 pr-3">Risk</th>
                  <th className="pb-2 pr-3">Bet</th>
                  <th className="pb-2">Payout</th>
                </tr>
              </thead>
              <tbody>
                {recentDrops.map((drop, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-2.5 pr-3 text-sm font-medium text-foreground">{drop.result}</td>
                    <td className="py-2.5 pr-3">
                      <Badge variant={drop.risk === "High" ? "destructive" : drop.risk === "Medium" ? "default" : "outline"}>
                        {drop.risk}
                      </Badge>
                    </td>
                    <td className="py-2.5 pr-3 text-sm text-muted-foreground">{drop.bet}</td>
                    <td className={`py-2.5 text-sm font-medium ${drop.payout === "$0" ? "text-destructive" : "text-success"}`}>
                      {drop.payout}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
}
