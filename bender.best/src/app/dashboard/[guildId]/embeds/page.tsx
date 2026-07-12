"use client";

import { use } from "react";
import { Code2, Eye } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const templates = [
  {
    name: "welcome",
    lastEdited: "Apr 28, 2026",
    preview: "Welcome to the server, {user}! 🎉",
  },
  {
    name: "rules",
    lastEdited: "Apr 15, 2026",
    preview: "Please read our server rules carefully...",
  },
  {
    name: "boost-thank",
    lastEdited: "Apr 22, 2026",
    preview: "Thanks for boosting, {user}! 💜",
  },
  {
    name: "announce",
    lastEdited: "Apr 30, 2026",
    preview: "📢 New announcement from the team!",
  },
];

export default function EmbedsPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Code2 className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Embeds</h1>
        </div>
        <Button variant="primary">Create New</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {templates.map((template) => (
          <Card key={template.name}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>{template.name}</CardTitle>
                <Badge variant="muted">{template.lastEdited}</Badge>
              </div>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </CardHeader>
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <div className="border-l-4 border-primary pl-3">
                <p className="text-sm text-muted-foreground">{template.preview}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button variant="default" size="sm">Edit</Button>
              <Button variant="ghost" size="sm">Duplicate</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
