"use client";

import { Toggle } from "@/components/ui/toggle";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const avatars = [
  { initials: "CU", color: "#5865F2", date: "Apr 28, 2026" },
  { initials: "CU", color: "#57F287", date: "Mar 15, 2026" },
  { initials: "CU", color: "#FEE75C", date: "Feb 22, 2026" },
  { initials: "CU", color: "#ED4245", date: "Jan 10, 2026" },
  { initials: "CU", color: "#EB459E", date: "Dec 5, 2025" },
  { initials: "CU", color: "#5865F2", date: "Nov 18, 2025" },
  { initials: "CU", color: "#9B59B6", date: "Oct 3, 2025" },
  { initials: "CU", color: "#1ABC9C", date: "Sep 1, 2025" },
];

export default function AvatarsPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Avatar History</h1>
        <Toggle label="Tracking Enabled" defaultChecked />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {avatars.map((avatar, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{ backgroundColor: avatar.color }}
              >
                {avatar.initials}
              </div>
              <span className="text-xs text-muted-foreground">{avatar.date}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
