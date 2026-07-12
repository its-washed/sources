"use client";

import { Store, DollarSign, TrendingUp, CreditCard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/ui/stat-card";

const businesses = [
  { name: "Coffee Shop", cost: "$5,000", earnings: "$450/hr", owned: true },
  { name: "Car Wash", cost: "$12,000", earnings: "$1,100/hr", owned: false },
  { name: "Restaurant", cost: "$30,000", earnings: "$2,800/hr", owned: false },
  { name: "Tech Store", cost: "$75,000", earnings: "$7,000/hr", owned: false },
  { name: "Hotel", cost: "$200,000", earnings: "$18,500/hr", owned: false },
  { name: "Casino", cost: "$500,000", earnings: "$46,000/hr", owned: false },
];

export default function BusinessPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Business</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={<Store className="h-4 w-4" />}
          label="Current Business"
          value="Coffee Shop"
        />
        <StatCard
          icon={<DollarSign className="h-4 w-4" />}
          label="Earning Rate"
          value="$450/hr"
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Total Pending"
          value="$3,200"
        />
        <StatCard
          icon={<CreditCard className="h-4 w-4" />}
          label="Card Equipped"
          value="None"
          iconColor="bg-muted text-muted-foreground"
        />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Current Business</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <Store className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">Coffee Shop</p>
                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Type: Food</span>
                  <span>•</span>
                  <span>Multiplier: 1.5x</span>
                </div>
                <p className="mt-1 text-sm text-success">Earning: $450/hr • Pending: $3,200</p>
              </div>
            </div>
            <Button>Collect</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Catalog</CardTitle>
        </CardHeader>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="pb-3 pr-4">Business</th>
              <th className="pb-3 pr-4">Cost</th>
              <th className="pb-3 pr-4">Earnings/Hr</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((biz) => (
              <tr key={biz.name} className="border-b border-border last:border-0">
                <td className="py-3.5 pr-4 text-sm font-medium text-foreground">{biz.name}</td>
                <td className="py-3.5 pr-4 text-sm text-muted-foreground">{biz.cost}</td>
                <td className="py-3.5 pr-4 text-sm text-success">{biz.earnings}</td>
                <td className="py-3.5 pr-4">
                  {biz.owned ? (
                    <Badge variant="success">Owned</Badge>
                  ) : (
                    <Badge variant="outline">Available</Badge>
                  )}
                </td>
                <td className="py-3.5">
                  {biz.owned ? (
                    <Button size="sm" variant="ghost" disabled>
                      Owned
                    </Button>
                  ) : (
                    <Button size="sm">Buy</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="destructive">Sell Business</Button>
        <p className="text-xs text-muted-foreground">Selling refunds 5% of the purchase price</p>
      </div>
    </div>
  );
}
