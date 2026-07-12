"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Difficulty = "easy" | "medium" | "hard" | "expert";

const diffConfig: Record<Difficulty, { safe: number; mine: number; label: string }> = {
  easy: { safe: 3, mine: 1, label: "Easy" },
  medium: { safe: 2, mine: 2, label: "Medium" },
  hard: { safe: 1, mine: 3, label: "Hard" },
  expert: { safe: 1, mine: 4, label: "Expert" },
};

const rows = [
  { safePositions: [1, 3, 4], minePositions: [2], result: "safe" },
  { safePositions: [0, 2], minePositions: [1, 3], result: "safe" },
  { safePositions: [2], minePositions: [0, 1, 3], result: null },
  { safePositions: [1], minePositions: [0, 2, 3], result: null },
  { safePositions: [3], minePositions: [0, 1, 2], result: null },
];

export default function ChickenRoadPage() {
  const [betAmount, setBetAmount] = useState("100");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [currentRow, setCurrentRow] = useState(2);

  const config = diffConfig[difficulty];
  const multiplier = (1.2 * currentRow).toFixed(1);

  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Chicken Road</h1>
      <p className="text-sm text-muted-foreground">Cross the road without hitting a mine. Advance row by row.</p>

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
                <label className="mb-1.5 block text-sm font-medium text-foreground">Difficulty</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(diffConfig) as Difficulty[]).map((d) => (
                    <Button
                      key={d}
                      variant={difficulty === d ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDifficulty(d)}
                      className="capitalize"
                    >
                      {diffConfig[d].label}
                    </Button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {config.safe} safe, {config.mine} mine per row
                </p>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Row</p>
                  <p className="text-lg font-bold text-foreground">{currentRow}/5</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Multiplier</p>
                  <p className="text-lg font-bold text-primary">{multiplier}x</p>
                </div>
              </div>
              <Button className="w-full">Cross</Button>
              <Button variant="outline" className="w-full" disabled={currentRow === 0}>
                <DollarSign className="h-4 w-4" />
                Cash Out ({multiplier}x)
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardContent className="flex flex-col gap-2 p-6">
              {rows.map((row, rowIdx) => {
                const totalSquares = config.safe + config.mine;
                const isActive = rowIdx === currentRow;
                const isPast = rowIdx < currentRow;

                return (
                  <div key={rowIdx} className="flex items-center gap-2">
                    <span className={`w-8 text-xs font-medium ${isActive ? "text-primary" : isPast ? "text-success" : "text-muted-foreground"}`}>
                      R{rowIdx + 1}
                    </span>
                    <div className="flex flex-1 gap-1.5">
                      {Array.from({ length: totalSquares }).map((_, sqIdx) => {
                        const isSafe = row.safePositions?.includes(sqIdx);
                        const isMine = row.minePositions?.includes(sqIdx);
                        const wasChosen = isPast && isSafe;

                        return (
                          <button
                            key={sqIdx}
                            disabled={!isActive || (isPast && Boolean(row.result))}
                            className={`flex flex-1 items-center justify-center rounded-lg py-4 text-sm font-bold transition-all ${
                              wasChosen
                                ? "border border-success/30 bg-success/20 text-success"
                                : isPast && isMine
                                ? "border border-destructive/30 bg-destructive/10 text-destructive"
                                : isPast
                                ? "border border-border bg-secondary/50 text-muted-foreground"
                                : isActive
                                ? "border border-primary/30 bg-secondary hover:bg-accent hover:border-primary/50 text-muted-foreground cursor-pointer"
                                : "border border-border bg-secondary/30 text-muted-foreground/50"
                            }`}
                          >
                            {wasChosen ? "🐔" : isPast && isMine ? "💣" : isPast ? "•" : isActive ? "?" : "•"}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
