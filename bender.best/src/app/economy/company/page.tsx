"use client";

import { Building2, DollarSign, Users, Star, TrendingUp, LogOut, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import StatCard from "@/components/ui/stat-card";

const companies = [
  { name: "Shadow Corp", tag: "SHAD", level: 7, members: 18, maxMembers: 30 },
  { name: "Nova Syndicate", tag: "NOVA", level: 5, members: 12, maxMembers: 20 },
  { name: "Apex Legends", tag: "APEX", level: 3, members: 8, maxMembers: 15 },
  { name: "Iron Forge", tag: "IRON", level: 2, members: 5, maxMembers: 10 },
];

export default function CompanyPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <h1 className="text-2xl font-bold text-foreground">Company</h1>

      <Tabs
        tabs={[
          { value: "mycompany", label: "My Company" },
          { value: "browse", label: "Browse Companies" },
        ]}
      >
        {(activeTab) =>
          activeTab === "mycompany" ? (
            <div className="flex flex-col gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20">
                        <Building2 className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-bold text-foreground">Vibrance Inc.</p>
                          <Badge>[VIBR]</Badge>
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                          <span>Rank #3</span>
                          <span>•</span>
                          <span>Level 4</span>
                          <span>•</span>
                          <span>Reputation 850</span>
                          <span>•</span>
                          <span>Members 8/25</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                <StatCard
                  icon={<DollarSign className="h-4 w-4" />}
                  label="Vault"
                  value="$42,500"
                />
                <StatCard
                  icon={<TrendingUp className="h-4 w-4" />}
                  label="Projects"
                  value="3/5"
                />
                <StatCard
                  icon={<Star className="h-4 w-4" />}
                  label="Network"
                  value="$125,000"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button>Deposit</Button>
                <Button variant="outline">Withdraw</Button>
                <Button variant="secondary">Edit</Button>
                <Button variant="destructive">
                  <LogOut className="h-4 w-4" />
                  Leave
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  className="h-10 w-full rounded-lg border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex flex-col gap-3">
                {companies.map((company) => (
                  <Card key={company.tag}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                          <Building2 className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-foreground">{company.name}</p>
                            <Badge variant="outline">{company.tag}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Level {company.level} • {company.members}/{company.maxMembers} members
                          </p>
                        </div>
                      </div>
                      <Button size="sm">Join</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-dashed border-primary/30">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <Building2 className="h-8 w-8 text-primary" />
                  <p className="text-sm font-medium text-foreground">Create a Company</p>
                  <p className="text-xs text-muted-foreground">Cost: $50,000</p>
                  <Button size="sm">Create</Button>
                </CardContent>
              </Card>
            </div>
          )
        }
      </Tabs>
    </div>
  );
}
