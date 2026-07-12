"use client";

import { useState } from "react";
import { Bomb, Diamond, DollarSign } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type TileState = "hidden" | "gem" | "mine";

export default function MinesPage() {
  const [betAmount, setBetAmount] = useState("100");
  const [mineCount, setMineCount] = useState(3);
  const [grid, setGrid] = useState<TileState[]>(Array(25).fill("hidden"));
  const [gameOver, setGameOver] = useState(false);
  const [revealed, setRevealed] = useState(0);

  const handleTileClick = (index: number) => {
    if (gameOver || grid[index] !== "hidden") return;
    const isMine = Math.random() < mineCount / 25;
    const newGrid = [...grid];
    newGrid[index] = isMine ? "mine" : "gem";
    setGrid(newGrid);
    if (isMine) {
      setGameOver(true);
    } else {
      setRevealed(revealed + 1);
    }
  };

  const multiplier = revealed > 0 ? (1 * Math.pow(25 / (25 - mineCount), revealed)).toFixed(2) : "1.00";

  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Mines</h1>
      <p className="text-sm text-muted-foreground">Reveal gems, avoid mines. More mines = higher multiplier.</p>

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
                <label className="mb-1.5 block text-sm font-medium text-foreground">Mines ({mineCount})</label>
                <input
                  type="range"
                  min={1}
                  max={24}
                  value={mineCount}
                  onChange={(e) => setMineCount(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>24</span>
                </div>
              </div>
              <Button className="w-full" disabled={gameOver}>
                <DollarSign className="h-4 w-4" />
                New Game
              </Button>
              <Button variant="outline" className="w-full" disabled={revealed === 0 || gameOver}>
                Cash Out ({multiplier}x)
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-5 gap-2">
                {grid.map((tile, i) => (
                  <button
                    key={i}
                    onClick={() => handleTileClick(i)}
                    disabled={tile !== "hidden" || gameOver}
                    className={`flex aspect-square items-center justify-center rounded-lg text-lg font-bold transition-all ${
                      tile === "hidden"
                        ? "border border-border bg-secondary hover:bg-accent hover:border-primary/30 cursor-pointer"
                        : tile === "gem"
                        ? "border border-success/30 bg-success/20 text-success"
                        : "border border-destructive/30 bg-destructive/20 text-destructive"
                    }`}
                  >
                    {tile === "gem" && <Diamond className="h-6 w-6" />}
                    {tile === "mine" && <Bomb className="h-6 w-6" />}
                    {tile === "hidden" && "?"}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
