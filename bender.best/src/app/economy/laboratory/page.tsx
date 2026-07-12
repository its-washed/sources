"use client";

import { FlaskConical, DollarSign, TrendingUp, CreditCard, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/ui/stat-card";

const labLevels = [
  { level: 1, cost: "$10,000", earnings: "$200/hr", card: "None" },
  { level: 2, cost: "$25,000", earnings: "$500/hr", card: "1 Star" },
  { level: 3, cost: "$50,000", earnings: "$900/hr", card: "1 Star" },
  { level: 4, cost: "$100,000", earnings: "$1,500/hr", card: "2 Star" },
  { level: 5, cost: "$250,000", earnings: "$2,200/hr", card: "2 Star" },
  { level: 6, cost: "$500,000", earnings: "$3,500/hr", card: "3 Star" },
  { level: 7, cost: "$1,000,000", earnings: "$5,500/hr", card: "3 Star" },
  { level: 8, cost: "$2,500,000", earnings: "$9,000/hr", card: "4 Star" },
  { level: 9, cost: "$5,000,000", earnings: "$15,000/hr", card: "4 Star" },
  { level: 10, cost: "$10,000,000", earnings: "$25,000/hr", card: "5 Star" },
];

export default function LaboratoryPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Laboratory</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={<FlaskConical className="h-4 w-4" />}
          label="Lab Level"
          value="5"
        />
        <StatCard
          icon={<DollarSign className="h-4 w-4" />}
          label="Earning Rate"
          value="$2,200/hr"
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Total Pending"
          value="$8,400"
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
          <CardTitle className="text-base">Current Lab</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <FlaskConical className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">Level 5</p>
                <p className="text-sm text-success">Earning: $2,200/hr • Pending: $8,400</p>
              </div>
            </div>
            <Button>Collect</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lab Levels</CardTitle>
        </CardHeader>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="pb-3 pr-4">Level</th>
              <th className="pb-3 pr-4">Cost</th>
              <th className="pb-3 pr-4">Earnings/Hr</th>
              <th className="pb-3 pr-4">Card Required</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {labLevels.map((lab) => (
              <tr
                key={lab.level}
                className={`border-b border-border last:border-0 ${
                  lab.level === 5 ? "bg-primary/5" : ""
                }`}
              >
                <td className="py-3.5 pr-4 text-sm font-medium text-foreground">
                  Level {lab.level}
                </td>
                <td className="py-3.5 pr-4 text-sm text-muted-foreground">{lab.cost}</td>
                <td className="py-3.5 pr-4 text-sm text-success">{lab.earnings}</td>
                <td className="py-3.5 pr-4">
                  <Badge variant="outline">{lab.card}</Badge>
                </td>
                <td className="py-3.5">
                  {lab.level === 5 ? (
                    <Badge>Current</Badge>
                  ) : lab.level < 5 ? (
                    <Badge variant="success">Unlocked</Badge>
                  ) : (
                    <Badge variant="outline">Locked</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
          <div>
            <p className="text-sm font-medium text-foreground">Upgrade to Level 6</p>
            <p className="text-xs text-muted-foreground">Cost: $500,000 • Earnings: $3,500/hr • Card: 3 Star required</p>
          </div>
          <Button>
            <ArrowUpRight className="h-4 w-4" />
            Upgrade
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="destructive">Sell Lab</Button>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">5% refund • Sell value: $250,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
