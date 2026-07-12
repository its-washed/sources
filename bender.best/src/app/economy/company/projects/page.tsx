"use client";

import { FolderKanban, DollarSign, Lock, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/ui/stat-card";

const activeProjects = [
  { name: "Marketing Campaign", progress: 75, earnings: "$5,000/hr" },
  { name: "R&D Lab", progress: 30, earnings: "$12,000/hr" },
];

const availableProjects = [
  { name: "Supply Chain", cost: "$15,000", earnings: "$3,000/hr", repRequired: 200, votes: 3, locked: false },
  { name: "Expansion Plan", cost: "$40,000", earnings: "$8,500/hr", repRequired: 500, votes: 5, locked: false },
  { name: "Global Network", cost: "$100,000", earnings: "$22,000/hr", repRequired: 1000, votes: 8, locked: true },
];

const completedProjects = [
  { name: "Office Setup", completedDate: "Mar 15, 2026", earnings: "$2,000/hr" },
  { name: "Team Building", completedDate: "Feb 28, 2026", earnings: "$1,500/hr" },
];

export default function CompanyProjectsPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Company Projects</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard
          icon={<FolderKanban className="h-4 w-4" />}
          label="Active Projects"
          value="2/5"
        />
        <StatCard
          icon={<DollarSign className="h-4 w-4" />}
          label="Total Earnings"
          value="$17,000/hr"
        />
        <StatCard
          icon={<CheckCircle2 className="h-4 w-4" />}
          label="Completed"
          value="2"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {activeProjects.map((project) => (
            <div
              key={project.name}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4"
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{project.name}</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{project.progress}%</span>
                </div>
                <p className="mt-1 text-xs text-success">{project.earnings}</p>
              </div>
              <Button size="sm">Contribute</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Projects</CardTitle>
        </CardHeader>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="pb-3 pr-4">Project</th>
              <th className="pb-3 pr-4">Cost</th>
              <th className="pb-3 pr-4">Earnings/Hr</th>
              <th className="pb-3 pr-4">Rep Required</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {availableProjects.map((project) => (
              <tr key={project.name} className="border-b border-border last:border-0">
                <td className="py-3.5 pr-4 text-sm font-medium text-foreground">
                  {project.name}
                  {project.locked && (
                    <Badge variant="outline" className="ml-2">
                      <Lock className="mr-1 h-3 w-3" />
                      Lvl 5
                    </Badge>
                  )}
                </td>
                <td className="py-3.5 pr-4 text-sm text-muted-foreground">{project.cost}</td>
                <td className="py-3.5 pr-4 text-sm text-success">{project.earnings}</td>
                <td className="py-3.5 pr-4 text-sm text-muted-foreground">{project.repRequired}</td>
                <td className="py-3.5">
                  <Button size="sm" disabled={project.locked}>
                    {project.locked ? "Locked" : "Start"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed Projects</CardTitle>
        </CardHeader>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="pb-3 pr-4">Project</th>
              <th className="pb-3 pr-4">Completed</th>
              <th className="pb-3">Earnings/Hr</th>
            </tr>
          </thead>
          <tbody>
            {completedProjects.map((project) => (
              <tr key={project.name} className="border-b border-border last:border-0">
                <td className="py-3.5 pr-4 text-sm font-medium text-foreground">{project.name}</td>
                <td className="py-3.5 pr-4 text-sm text-muted-foreground">{project.completedDate}</td>
                <td className="py-3.5 text-sm text-success">{project.earnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
