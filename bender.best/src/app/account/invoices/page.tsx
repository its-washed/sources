"use client";

import { Search, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const invoices = [
  { id: "INV-001", description: "Premium Subscription - Monthly", amount: "$9.99", status: "Paid" as const, date: "Mar 1, 2026" },
  { id: "INV-002", description: "Premium Subscription - Monthly", amount: "$9.99", status: "Paid" as const, date: "Feb 1, 2026" },
  { id: "INV-003", description: "Custom Embed Package", amount: "$4.99", status: "Pending" as const, date: "Jan 28, 2026" },
  { id: "INV-004", description: "Premium Subscription - Monthly", amount: "$9.99", status: "Paid" as const, date: "Jan 1, 2026" },
  { id: "INV-005", description: "Server Boost Refund", amount: "$14.99", status: "Refunded" as const, date: "Dec 15, 2025" },
];

const statusVariant = {
  Paid: "success" as const,
  Pending: "warning" as const,
  Refunded: "destructive" as const,
};

export default function InvoicesPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="h-9 w-64 rounded-lg border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <Card>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="pb-3 pr-4">Invoice #</th>
              <th className="pb-3 pr-4">Description</th>
              <th className="pb-3 pr-4">Amount</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-border last:border-0">
                <td className="py-3.5 pr-4 text-sm font-medium text-foreground">
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {invoice.id}
                  </span>
                </td>
                <td className="py-3.5 pr-4 text-sm text-card-foreground">{invoice.description}</td>
                <td className="py-3.5 pr-4 text-sm font-medium text-foreground">{invoice.amount}</td>
                <td className="py-3.5 pr-4">
                  <Badge variant={statusVariant[invoice.status]}>{invoice.status}</Badge>
                </td>
                <td className="py-3.5 text-sm text-muted-foreground">{invoice.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
