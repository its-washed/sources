"use client";

import { useState } from "react";
import { Disc3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const numbers = Array.from({ length: 37 }, (_, i) => i);

const recentSpins = [
  { number: 14, color: "red" },
  { number: 0, color: "green" },
  { number: 27, color: "red" },
  { number: 8, color: "black" },
  { number: 32, color: "red" },
];

export default function RoulettePage() {
  const [betAmount, setBetAmount] = useState("100");
  const [betType, setBetType] = useState<"color" | "oddeven" | "number">("color");
  const [chipValue, setChipValue] = useState(100);

  const getNumberColor = (num: number) => {
    if (num === 0) return "bg-green-600";
    if (redNumbers.includes(num)) return "bg-red-600";
    return "bg-gray-800";
  };

  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Roulette</h1>
      <p className="text-sm text-muted-foreground">Spin the wheel and place your bets.</p>

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
                <label className="mb-1.5 block text-sm font-medium text-foreground">Bet Type</label>
                <div className="flex gap-2">
                  <Button
                    variant={betType === "color" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBetType("color")}
                    className="flex-1"
                  >
                    Color
                  </Button>
                  <Button
                    variant={betType === "oddeven" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBetType("oddeven")}
                    className="flex-1"
                  >
                    Odd/Even
                  </Button>
                  <Button
                    variant={betType === "number" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBetType("number")}
                    className="flex-1"
                  >
                    Number
                  </Button>
                </div>
              </div>
              {betType === "color" && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-red-600/30 text-red-400 hover:bg-red-600/10">Red</Button>
                  <Button variant="outline" size="sm" className="flex-1 border-gray-600/30 text-gray-300 hover:bg-gray-600/10">Black</Button>
                </div>
              )}
              {betType === "oddeven" && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Odd</Button>
                  <Button variant="outline" size="sm" className="flex-1">Even</Button>
                </div>
              )}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Chip Value</label>
                <div className="flex gap-2">
                  {[10, 50, 100, 500, 1000].map((val) => (
                    <Button
                      key={val}
                      variant={chipValue === val ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChipValue(val)}
                      className="flex-1 text-xs"
                    >
                      ${val}
                    </Button>
                  ))}
                </div>
              </div>
              <Button className="w-full">
                <Disc3 className="h-4 w-4" />
                Spin
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-13 gap-1">
                <button className={`col-span-1 flex h-10 items-center justify-center rounded text-xs font-bold text-white ${getNumberColor(0)}`}>0</button>
                <div className="col-span-12 grid grid-cols-12 gap-1">
                  {numbers.slice(1).map((num) => (
                    <button
                      key={num}
                      className={`flex h-8 items-center justify-center rounded text-xs font-bold text-white ${getNumberColor(num)} hover:opacity-80 transition-opacity`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-center p-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary bg-card">
                <div className="text-center">
                  <p className="text-3xl font-bold text-foreground">14</p>
                  <Badge className="bg-red-600/20 text-red-400">Red</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="mb-2 text-sm font-medium text-foreground">Recent Spins</p>
              <div className="flex gap-2">
                {recentSpins.map((spin, i) => (
                  <div
                    key={i}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${
                      spin.color === "green" ? "bg-green-600" : spin.color === "red" ? "bg-red-600" : "bg-gray-800"
                    }`}
                  >
                    {spin.number}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
