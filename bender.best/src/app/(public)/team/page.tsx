"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface TeamMember {
  username: string;
  avatar: string;
  banner?: string;
  decoration?: string;
}

const owners: TeamMember[] = [
  {
    username: "curet",
    avatar: "https://api.bender.best/avatar/335500798752456705",
    banner: "https://api.bender.best/banner/335500798752456705",
    decoration:
      "https://cdn.discordapp.com/avatar-decoration-presets/a_3c97a2d37f433a7913a1c7b7a735d000.png",
  },
  {
    username: "visics",
    avatar: "https://api.bender.best/avatar/383304634246103042",
  },
  {
    username: "zlenii",
    avatar: "https://api.bender.best/avatar/665593710268121098",
    banner: "https://api.bender.best/banner/665593710268121098",
    decoration:
      "https://cdn.discordapp.com/avatar-decoration-presets/a_3c97a2d37f433a7913a1c7b7a735d000.png",
  },
];

const admins: TeamMember[] = [
  {
    username: "trave.",
    avatar: "https://api.bender.best/avatar/560011836775202817",
  },
  {
    username: "xapnat",
    avatar: "https://api.bender.best/avatar/864135836727508994",
    decoration:
      "https://cdn.discordapp.com/avatar-decoration-presets/a_1e929fcc6a6a5193d17f016d4c97746e.png",
  },
];

const moderators: TeamMember[] = [
  {
    username: "bvnyk_",
    avatar: "https://api.bender.best/avatar/1279681126595821601",
    decoration:
      "https://cdn.discordapp.com/avatar-decoration-presets/a_d3e51a9751016df2778a47efbb8bb455.png",
  },
  {
    username: "felvq",
    avatar: "https://api.bender.best/avatar/1230645006440595614",
    decoration:
      "https://cdn.discordapp.com/avatar-decoration-presets/a_13913a00bd9990ab4102a3bf069f0f3f.png",
  },
  {
    username: "itspaul.at",
    avatar: "https://api.bender.best/avatar/720294426064453665",
    banner: "https://api.bender.best/banner/720294426064453665",
    decoration:
      "https://cdn.discordapp.com/avatar-decoration-presets/a_19b258f0d1bf320f024aa7f52d45d294.png",
  },
  {
    username: "theonesandman.",
    avatar: "https://api.bender.best/avatar/700281178338361364",
    decoration:
      "https://cdn.discordapp.com/avatar-decoration-presets/a_6d16b27d9415cafe3b289053644337c4.png",
  },
  {
    username: "abgehauen",
    avatar: "https://api.bender.best/avatar/977502789091602482",
  },
  {
    username: "pwsd",
    avatar: "https://api.bender.best/avatar/715689395965132882",
    banner: "https://api.bender.best/banner/715689395965132882",
    decoration:
      "https://cdn.discordapp.com/avatar-decoration-presets/a_1e929fcc6a6a5193d17f016d4c97746e.png",
  },
];

const glassCard =
  "border-border/50 from-card to-background hover:border-border/80 relative rounded-[2rem] border bg-linear-to-br overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_1px_3px_rgba(0,0,0,0.3),inset_0_-1px_1px_rgba(0,0,0,0.2)] transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-[1.5rem] before:bg-linear-to-b before:from-white/[0.02] before:to-transparent after:absolute after:inset-0 after:z-[-1] after:rounded-[2rem] after:bg-linear-to-t after:from-black/30 after:to-transparent";

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className={glassCard}>
      {member.banner ? (
        <div className="h-24 w-full relative">
          <Image src={member.banner} alt="" fill className="object-cover" />
        </div>
      ) : (
        <div className="h-10" />
      )}
      <div
        className={`flex flex-col items-center ${member.banner ? "-mt-12" : ""} pb-5`}
      >
        <div className="relative" style={{ width: 80, height: 80 }}>
          <Image
            src={member.avatar}
            alt={member.username}
            width={80}
            height={80}
            className="rounded-full border-4 border-card"
          />
          {member.decoration ? (
            <Image
              src={member.decoration}
              alt=""
              width={110}
              height={110}
              className="absolute pointer-events-none"
              style={{ top: -15, left: -15 }}
            />
          ) : null}
        </div>
        <span className="mt-3 text-sm font-semibold text-foreground">
          {member.username}
        </span>
      </div>
    </div>
  );
}

function TeamSection({
  title,
  members,
  cols,
}: {
  title: string;
  members: TeamMember[];
  cols: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <Badge variant="secondary">{members.length}</Badge>
      </div>
      <div className={`grid gap-6 grid-cols-1 sm:grid-cols-2 ${cols}`}>
        {members.map((m) => (
          <MemberCard key={m.username} member={m} />
        ))}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="flex flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Our Team</h1>
        <p className="text-muted-foreground">Meet the people behind the bot.</p>
      </div>
      <TeamSection title="Owner" members={owners} cols="md:grid-cols-3" />
      <TeamSection
        title="Administrators"
        members={admins}
        cols="md:grid-cols-2"
      />
      <TeamSection title="Moderators" members={moderators} cols="md:grid-cols-3" />
    </div>
  );
}
