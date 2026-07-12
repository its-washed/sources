"use client";

import { CreditCard, Star, Package, Trash2, Merge, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";

const cases = [
  { name: "Standard Case", cost: "$1,000", color: "text-foreground" },
  { name: "Black Ice Case", cost: "$5,000", color: "text-blue-400" },
  { name: "Business Case", cost: "$2,500", color: "text-success" },
  { name: "Lab Case", cost: "$2,000", color: "text-purple-400" },
];

const cards = [
  { name: "Standard", stars: 1, type: "Standard", multiplier: "1.2x", storage: "24h" },
  { name: "Black Ice", stars: 2, type: "Black Ice", multiplier: "1.5x", storage: "48h" },
  { name: "Business Boost", stars: 3, type: "Business", multiplier: "2.0x", storage: "72h" },
  { name: "Lab Boost", stars: 3, type: "Lab", multiplier: "2.0x", storage: "72h" },
  { name: "Midas Touch", stars: 4, type: "Standard", multiplier: "3.0x", storage: "96h" },
  { name: "Frozen Core", stars: 4, type: "Black Ice", multiplier: "3.5x", storage: "96h" },
  { name: "Business Elite", stars: 5, type: "Business", multiplier: "5.0x", storage: "120h" },
  { name: "Lab Supreme", stars: 5, type: "Lab", multiplier: "5.0x", storage: "120h" },
];

const typeColor: Record<string, string> = {
  Standard: "default",
  "Black Ice": "default",
  Business: "success",
  Lab: "default",
};

export default function CardsPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Cards</h1>

      <Tabs
        tabs={[
          { value: "cases", label: "Open Cases" },
          { value: "mycards", label: "My Cards" },
        ]}
      >
        {(activeTab) =>
          activeTab === "cases" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cases.map((c) => (
                <Card key={c.name}>
                  <CardContent className="flex flex-col items-center gap-4 p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-secondary">
                      <CreditCard className={`h-8 w-8 ${c.color}`} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-foreground">{c.name}</p>
                      <p className="text-sm text-muted-foreground">{c.cost}</p>
                    </div>
                    <Button size="sm" className="w-full">
                      <Package className="h-4 w-4" />
                      Open
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Cards: <span className="font-medium text-foreground">12</span>/50
                </p>
                <div className="flex items-center gap-2">
                  <select className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground">
                    <option>All Types</option>
                    <option>Standard</option>
                    <option>Black Ice</option>
                    <option>Business</option>
                    <option>Lab</option>
                  </select>
                  <select className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground">
                    <option>All Stars</option>
                    <option>1 Star</option>
                    <option>2 Stars</option>
                    <option>3 Stars</option>
                    <option>4 Stars</option>
                    <option>5 Stars</option>
                  </select>
                  <select className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground">
                    <option>Sort: Stars</option>
                    <option>Sort: Multiplier</option>
                    <option>Sort: Storage</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => (
                  <Card key={card.name}>
                    <CardContent className="p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: card.stars }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <Badge
                          variant={
                            typeColor[card.type] === "success"
                              ? "success"
                              : "default"
                          }
                        >
                          {card.type}
                        </Badge>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{card.name}</p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{card.multiplier}</span>
                        <span>•</span>
                        <span>{card.storage}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-1.5">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Zap className="h-3 w-3" />
                          Equip
                        </Button>
                        <Button size="sm" variant="ghost" className="flex-1">
                          <Merge className="h-3 w-3" />
                          Merge
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Merge 10 cards of the same star level into 1 card of the next star level
                </p>
                <Button size="sm" variant="destructive">
                  <Trash2 className="h-4 w-4" />
                  Bulk Shred
                </Button>
              </div>
            </div>
          )
        }
      </Tabs>
    </div>
  );
}
