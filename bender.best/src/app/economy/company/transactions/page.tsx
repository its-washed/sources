"use client";

import { ArrowUpRight, ArrowDownRight, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const transactions = [
  { date: "Apr 30, 2026", type: "Deposit", amount: "+$5,000", member: "curet" },
  { date: "Apr 29, 2026", type: "Project", amount: "-$12,000", member: "curet" },
  { date: "Apr 28, 2026", type: "Deposit", amount: "+$10,000", member: "shadowwolf" },
  { date: "Apr 27, 2026", type: "Withdraw", amount: "-$3,500", member: "ironforge" },
  { date: "Apr 26, 2026", type: "Refund", amount: "+$1,500", member: "curet" },
  { date: "Apr 25, 2026", type: "Deposit", amount: "+$20,000", member: "nova_star" },
  { date: "Apr 24, 2026", type: "Project", amount: "-$8,000", member: "curet" },
  { date: "Apr 23, 2026", type: "Withdraw", amount: "-$5,000", member: "phantom_x" },
  { date: "Apr 22, 2026", type: "Deposit", amount: "+$15,000", member: "blazeking" },
  { date: "Apr 21, 2026", type: "Deposit", amount: "+$35,000", member: "curet" },
];

const typeVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Deposit: "default",
  Withdraw: "destructive",
  Project: "secondary",
  Refund: "outline",
};

export default function CompanyTransactionsPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Company Transactions</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total In</p>
            <p className="text-xl font-bold text-success">+$85,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Out</p>
            <p className="text-xl font-bold text-destructive">-$42,500</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Net</p>
            <p className="text-xl font-bold text-foreground">$42,500</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-48 rounded-lg border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </CardHeader>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="pb-3 pr-4">Date</th>
              <th className="pb-3 pr-4">Type</th>
              <th className="pb-3 pr-4">Amount</th>
              <th className="pb-3">Member</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="py-3.5 pr-4 text-sm text-muted-foreground">{tx.date}</td>
                <td className="py-3.5 pr-4">
                  <Badge variant={typeVariant[tx.type]}>{tx.type}</Badge>
                </td>
                <td className={`py-3.5 pr-4 text-sm font-medium ${tx.amount.startsWith("+") ? "text-success" : "text-destructive"}`}>
                  {tx.amount}
                </td>
                <td className="py-3.5 text-sm text-foreground">{tx.member}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
