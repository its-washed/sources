"use client";

import { useState } from "react";
import { Diamond } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const paytable = [
  { picks: 10, hits: [0, 0, 0, 0, 0, 0.2, 0.5, 1, 2, 5, 50] },
  { picks: 8, hits: [0, 0, 0, 0.2, 0.5, 1, 2, 5, 20] },
  { picks: 6, hits: [0, 0, 0.5, 1, 2, 5, 10] },
  { picks: 4, hits: [0, 0.5, 1, 3, 10] },
];

export default function KenoPage() {
  const [betAmount, setBetAmount] = useState("100");
  const [selected, setSelected] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);

  const totalTiles = 32;
  const maxPicks = 10;

  const toggleTile = (index: number) => {
    if (revealed) return;
    if (selected.includes(index)) {
      setSelected(selected.filter((s) => s !== index));
    } else if (selected.length < maxPicks) {
      setSelected([...selected, index]);
    }
  };

  const mockCrystals = [2, 5, 7, 11, 15, 19, 22, 27, 30, 31];
  const hits = selected.filter((s) => mockCrystals.includes(s)).length;

  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Keno</h1>
      <p className="text-sm text-muted-foreground">Select tiles and reveal hidden crystals. More hits = bigger multiplier.</p>

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
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Selected</span>
                <Badge>{selected.length}/{maxPicks}</Badge>
              </div>
              <Button
                className="w-full"
                disabled={selected.length === 0 || revealed}
                onClick={() => setRevealed(true)}
              >
                <Diamond className="h-4 w-4" />
                Reveal
              </Button>
              {revealed && (
                <div className="rounded-lg border border-border bg-secondary/50 p-3 text-center">
                  <p className="text-sm text-muted-foreground">Hits</p>
                  <p className="text-2xl font-bold text-success">{hits}/{selected.length}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="mb-3 text-sm font-medium text-foreground">Paytable</p>
              <div className="flex flex-col gap-2">
                {paytable.map((row) => (
                  <div key={row.picks} className="flex items-center gap-2 text-xs">
                    <span className="w-16 text-muted-foreground">{row.picks} picks</span>
                    <div className="flex flex-1 flex-wrap gap-1">
                      {row.hits.map((mult, i) => (
                        <span
                          key={i}
                          className={`rounded px-1.5 py-0.5 ${
                            mult === 0
                              ? "bg-destructive/10 text-destructive"
                              : mult >= 5
                              ? "bg-success/10 text-success"
                              : "bg-secondary text-foreground"
                          }`}
                        >
                          {i}h:{mult}x
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-8 gap-2">
                {Array.from({ length: totalTiles }).map((_, i) => {
                  const isSelected = selected.includes(i);
                  const isCrystal = revealed && mockCrystals.includes(i);
                  const isEmpty = revealed && !mockCrystals.includes(i) && isSelected;

                  return (
                    <button
                      key={i}
                      onClick={() => toggleTile(i)}
                      disabled={revealed}
                      className={`flex aspect-square items-center justify-center rounded-lg text-sm font-bold transition-all ${
                        isCrystal
                          ? "border-2 border-success bg-success/20 text-success"
                          : isEmpty
                          ? "border border-destructive/30 bg-destructive/10 text-destructive"
                          : isSelected
                          ? "border-2 border-primary bg-primary/20 text-primary"
                          : "border border-border bg-secondary hover:bg-accent hover:border-primary/30 text-muted-foreground cursor-pointer"
                      }`}
                    >
                      {isCrystal ? <Diamond className="h-5 w-5" /> : isEmpty ? "✕" : isSelected ? i + 1 : i + 1}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
