"use client";

import { useState } from "react";
import { Server } from "lucide-react";

const languages = ["All Languages", "English", "Spanish", "French", "German", "Portuguese", "Dutch", "Turkish", "Arabic", "Japanese", "Korean", "Chinese"];

const serverData = [
  { name: "Gaming Hub", description: "A community for gamers to connect, compete, and share.", members: "12,450", language: "English", icon: "G", bumped: "2h ago" },
  { name: "Chill Zone", description: "Relax, chat, and make new friends in a laid-back environment.", members: "8,200", language: "English", icon: "C", bumped: "5h ago" },
  { name: "Art Studio", description: "Share your art, get feedback, and collaborate with other artists.", members: "5,600", language: "English", icon: "A", bumped: "1d ago" },
  { name: "Music Lounge", description: "Discover new music, share playlists, and discuss your favorites.", members: "15,100", language: "English", icon: "M", bumped: "3h ago" },
  { name: "Code Corner", description: "A space for developers to share code, ask questions, and learn.", members: "3,800", language: "English", icon: "C", bumped: "8h ago" },
  { name: "Anime World", description: "Discuss anime, manga, and Japanese culture with fellow fans.", members: "9,700", language: "English", icon: "A", bumped: "12h ago" },
];

const glassCard = "border-border/50 from-card to-background hover:border-border/80 relative rounded-[2rem] border bg-linear-to-br p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_1px_3px_rgba(0,0,0,0.3),inset_0_-1px_1px_rgba(0,0,0,0.2)] transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-[1.5rem] before:bg-linear-to-b before:from-white/[0.02] before:to-transparent after:absolute after:inset-0 after:z-[-1] after:rounded-[2rem] after:bg-linear-to-t after:from-black/30 after:to-transparent";

export default function ServersPage() {
  const [language, setLanguage] = useState("All Languages");

  const filtered = language === "All Languages" ? serverData : serverData.filter((s) => s.language === language);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Server List</h1>
        <p className="mt-2 text-muted-foreground">Discover and explore Discord servers.</p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Server className="h-4 w-4 text-primary" />
          {filtered.length} server{filtered.length !== 1 ? "s" : ""}
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-xl border border-border/50 bg-card px-4 py-2 text-sm text-foreground shadow-sm transition-colors hover:border-border/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((server) => (
          <div key={server.name} className={glassCard}>
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/20 text-lg font-bold text-primary">
                {server.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-semibold text-foreground">{server.name}</h3>
                <p className="text-xs text-muted-foreground">{server.members} members</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{server.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="rounded-full border border-border/50 bg-secondary/60 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                {server.language}
              </span>
              <span className="text-xs text-muted-foreground">Bumped {server.bumped}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
