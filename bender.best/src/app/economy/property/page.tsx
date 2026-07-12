"use client";

import { Home, DollarSign, TrendingUp, ArrowUpRight, Wrench, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/ui/stat-card";

const properties = [
  { name: "Small Plot", cost: "$2,500", income: "$50/hr", status: "owned" },
  { name: "Medium Plot", cost: "$10,000", income: "$250/hr", status: "locked" },
  { name: "Large Estate", cost: "$50,000", income: "$1,200/hr", status: "locked" },
  { name: "Penthouse", cost: "$200,000", income: "$5,000/hr", status: "locked" },
];

export default function PropertyPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Property</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={<Home className="h-4 w-4" />}
          label="Properties Owned"
          value="1"
        />
        <StatCard
          icon={<DollarSign className="h-4 w-4" />}
          label="Total Income"
          value="$50/hr"
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Total Value"
          value="$2,500"
        />
        <StatCard
          icon={<ArrowUpRight className="h-4 w-4" />}
          label="Pending Income"
          value="$320"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Property</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">Small Plot</p>
                <p className="text-sm text-muted-foreground">Income: $50/hr</p>
                <p className="text-sm text-success">Pending: $320</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm">Collect</Button>
              <Button size="sm" variant="outline">
                <Wrench className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Properties</CardTitle>
        </CardHeader>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="pb-3 pr-4">Property</th>
              <th className="pb-3 pr-4">Cost</th>
              <th className="pb-3 pr-4">Income/Hr</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop) => (
              <tr key={prop.name} className="border-b border-border last:border-0">
                <td className="py-3.5 pr-4 text-sm font-medium text-foreground">{prop.name}</td>
                <td className="py-3.5 pr-4 text-sm text-muted-foreground">{prop.cost}</td>
                <td className="py-3.5 pr-4 text-sm text-success">{prop.income}</td>
                <td className="py-3.5 pr-4">
                  {prop.status === "owned" ? (
                    <Badge variant="success">Owned</Badge>
                  ) : (
                    <Badge variant="outline">Available</Badge>
                  )}
                </td>
                <td className="py-3.5">
                  {prop.status === "owned" ? (
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
    </div>
  );
}
