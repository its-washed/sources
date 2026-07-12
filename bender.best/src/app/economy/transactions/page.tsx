"use client";

import { Search, ArrowUpRight, ArrowDownRight, Filter } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const transactions = [
  { date: "Apr 30, 2026", category: "Gambling", action: "Won Blackjack", amount: "+$2,400" },
  { date: "Apr 30, 2026", category: "Gambling", action: "Bet on Roulette", amount: "-$500" },
  { date: "Apr 29, 2026", category: "Daily", action: "Claimed Daily Bonus", amount: "+$2,500" },
  { date: "Apr 29, 2026", category: "Bonus", action: "6h Bonus Claimed", amount: "+$750" },
  { date: "Apr 28, 2026", category: "Work", action: "Hourly Bonus", amount: "+$120" },
  { date: "Apr 28, 2026", category: "Business", action: "Collected Business Income", amount: "+$450" },
  { date: "Apr 27, 2026", category: "Laboratory", action: "Collected Lab Earnings", amount: "+$2,200" },
  { date: "Apr 27, 2026", category: "Cards", action: "Opened Standard Case", amount: "-$1,000" },
  { date: "Apr 26, 2026", category: "Company", action: "Deposited to Company Vault", amount: "-$5,000" },
  { date: "Apr 26, 2026", category: "Vault", action: "Withdrew from Vault", amount: "+$3,000" },
  { date: "Apr 25, 2026", category: "Gambling", action: "Won Mines", amount: "+$8,500" },
  { date: "Apr 24, 2026", category: "Gambling", action: "Lost Dice", amount: "-$2,000" },
  { date: "Apr 23, 2026", category: "Daily", action: "Claimed Daily Bonus", amount: "+$2,500" },
  { date: "Apr 22, 2026", category: "Business", action: "Bought Car Wash", amount: "-$12,000" },
  { date: "Apr 21, 2026", category: "Rebirth", action: "Rebirth Penalty", amount: "-$0" },
];

const categoryVariant: Record<string, "default" | "secondary" | "outline" | "destructive" | "success"> = {
  Gambling: "default",
  Daily: "success",
  Bonus: "success",
  Work: "secondary",
  Business: "secondary",
  Laboratory: "outline",
  Cards: "outline",
  Company: "default",
  Vault: "secondary",
  Rebirth: "destructive",
};

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Transactions</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Income</p>
            <p className="text-xl font-bold text-success">+$156,200</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Expenses</p>
            <p className="text-xl font-bold text-destructive">-$131,350</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Net</p>
            <p className="text-xl font-bold text-success">+$24,850</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Transaction History</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="h-9 w-56 rounded-lg border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <select className="h-9 rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option>All Categories</option>
              <option>Gambling</option>
              <option>Daily</option>
              <option>Bonus</option>
              <option>Work</option>
              <option>Business</option>
              <option>Laboratory</option>
              <option>Cards</option>
              <option>Company</option>
              <option>Vault</option>
              <option>Rebirth</option>
            </select>
            <input
              type="date"
              className="h-9 rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </CardHeader>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="pb-3 pr-4">Date</th>
              <th className="pb-3 pr-4">Category</th>
              <th className="pb-3 pr-4">Action</th>
              <th className="pb-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="py-3.5 pr-4 text-sm text-muted-foreground">{tx.date}</td>
                <td className="py-3.5 pr-4">
                  <Badge variant={categoryVariant[tx.category]}>{tx.category}</Badge>
                </td>
                <td className="py-3.5 pr-4 text-sm text-foreground">{tx.action}</td>
                <td className={`py-3.5 text-sm font-medium ${tx.amount.startsWith("+") ? "text-success" : "text-destructive"}`}>
                  {tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
