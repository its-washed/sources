"use client";

import { useState } from "react";
import { Spade, Heart, Club, Diamond } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Suit = "♠" | "♥" | "♦" | "♣";

interface PlayingCard {
  value: string;
  suit: Suit;
  faceDown?: boolean;
}

const suitColor: Record<Suit, string> = {
  "♠": "text-foreground",
  "♥": "text-red-400",
  "♦": "text-red-400",
  "♣": "text-foreground",
};

const recentHands = [
  { result: "Won", player: 20, dealer: 18, payout: "+$200" },
  { result: "Lost", player: 22, dealer: 21, payout: "-$100" },
  { result: "Push", player: 19, dealer: 19, payout: "$0" },
];

export default function BlackjackPage() {
  const [betAmount, setBetAmount] = useState("100");
  const [gameState, setGameState] = useState<"betting" | "playing" | "result">("playing");

  const dealerHand: PlayingCard[] = [
    { value: "K", suit: "♥" },
    { value: "?", suit: "♠", faceDown: true },
  ];

  const playerHand: PlayingCard[] = [
    { value: "7", suit: "♣" },
    { value: "4", suit: "♦" },
  ];

  const renderCard = (card: PlayingCard) => (
    <div
      className={`flex h-24 w-16 flex-col items-center justify-center rounded-lg border-2 shadow-lg ${
        card.faceDown
          ? "border-primary/30 bg-primary/10"
          : "border-border bg-card"
      }`}
    >
      {card.faceDown ? (
        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/20">
          <span className="text-xs font-bold text-primary">?</span>
        </div>
      ) : (
        <>
          <span className={`text-lg font-bold ${suitColor[card.suit]}`}>{card.value}</span>
          <span className={`text-sm ${suitColor[card.suit]}`}>{card.suit}</span>
        </>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Blackjack</h1>
      <p className="text-sm text-muted-foreground">Beat the dealer by getting closer to 21 without going over.</p>

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
              {gameState === "betting" && (
                <Button className="w-full">Deal</Button>
              )}
              {gameState === "playing" && (
                <div className="flex flex-col gap-2">
                  <Button className="w-full">Hit</Button>
                  <Button variant="outline" className="w-full">Stand</Button>
                  <Button variant="secondary" className="w-full">Double Down</Button>
                </div>
              )}
              {gameState === "result" && (
                <Button className="w-full" onClick={() => setGameState("betting")}>
                  New Hand
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="mb-2 text-sm font-medium text-foreground">Recent Hands</p>
              <div className="flex flex-col gap-2">
                {recentHands.map((hand, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-2.5">
                    <div>
                      <Badge variant={hand.result === "Won" ? "success" : hand.result === "Lost" ? "destructive" : "outline"}>
                        {hand.result}
                      </Badge>
                      <p className="mt-1 text-xs text-muted-foreground">
                        You: {hand.player} • Dealer: {hand.dealer}
                      </p>
                    </div>
                    <span className={`text-sm font-medium ${hand.payout.startsWith("+") ? "text-success" : hand.payout.startsWith("-") ? "text-destructive" : "text-muted-foreground"}`}>
                      {hand.payout}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col items-center gap-6 lg:col-span-2">
          <Card className="w-full max-w-lg">
            <CardContent className="flex flex-col items-center gap-6 p-8">
              <div className="w-full">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">Dealer</p>
                  <Badge variant="outline">?</Badge>
                </div>
                <div className="flex gap-2 justify-center">
                  {dealerHand.map((card, i) => (
                    <div key={i}>{renderCard(card)}</div>
                  ))}
                </div>
              </div>

              <div className="h-px w-full bg-border" />

              <div className="w-full">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">Your Hand</p>
                  <Badge>11</Badge>
                </div>
                <div className="flex gap-2 justify-center">
                  {playerHand.map((card, i) => (
                    <div key={i}>{renderCard(card)}</div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
