"use client";

import { RotateCcw, AlertTriangle, Check, X, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const requirements = [
  { label: "Level Required", value: "50", met: false, current: "12" },
  { label: "Balance", value: "$100,000", met: false, current: "$24,850" },
  { label: "Lab Level", value: "8", met: false, current: "5" },
  { label: "Business Owned", value: "Yes", met: true, current: "Coffee Shop" },
];

const bonuses = [
  "Lab Max Level +5",
  "1h Bonus +$50",
  "6h Bonus +$300",
  "24h Bonus +$1,000",
  "Daily Streak Base +2",
  "Credit Card Design (cosmetic)",
];

const resetItems = ["Balance to $0", "Lab deleted", "Business deleted", "All cards locked"];
const keptItems = ["Streak", "Cooldowns", "XP", "Level", "Company membership"];

export default function RebirthPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Rebirth</h1>
        <Badge variant="outline">Level 0 / Max</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Requirements</CardTitle>
        </CardHeader>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="pb-3 pr-4">Requirement</th>
              <th className="pb-3 pr-4">Needed</th>
              <th className="pb-3 pr-4">Current</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {requirements.map((req) => (
              <tr key={req.label} className="border-b border-border last:border-0">
                <td className="py-3.5 pr-4 text-sm font-medium text-foreground">{req.label}</td>
                <td className="py-3.5 pr-4 text-sm text-muted-foreground">{req.value}</td>
                <td className="py-3.5 pr-4 text-sm text-foreground">{req.current}</td>
                <td className="py-3.5">
                  {req.met ? (
                    <Badge variant="success">
                      <Check className="mr-1 h-3 w-3" />
                      Met
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <X className="mr-1 h-3 w-3" />
                      Not Met
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rebirth Bonuses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {bonuses.map((bonus) => (
              <div
                key={bonus}
                className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 p-3"
              >
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">{bonus}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-destructive/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Will Reset
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {resetItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-destructive">
                  <X className="h-4 w-4" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-success/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-success">
              <Check className="h-5 w-5" />
              Kept After Rebirth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {keptItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-success">
                  <Check className="h-4 w-4" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Button variant="destructive" size="lg" disabled className="w-full">
        <RotateCcw className="h-5 w-5" />
        Rebirth (Requirements Not Met)
      </Button>
    </div>
  );
}
