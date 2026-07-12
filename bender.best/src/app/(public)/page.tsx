"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Coins,
  Headphones,
  Gift,
  Music,
  Hash,
  Volume2,
  Trophy,
  TrendingUp,
  Lock,
  RotateCw,
  Settings,
  Sparkles,
  ArrowRight,
  Users,
  Server,
  Search,
  ShieldCheck,
  Code,
  Fingerprint,
  Zap,
} from "lucide-react";

const OAUTH_URL =
  "https://discord.com/oauth2/authorize?client_id=1472242893400838255&scope=bot+applications.commands&permissions=8";

const glassCard =
  "border-border/50 from-card to-background hover:border-border/80 relative h-full rounded-[2rem] border bg-linear-to-br p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_1px_3px_rgba(0,0,0,0.3),inset_0_-1px_1px_rgba(0,0,0,0.2)] transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-[1.5rem] before:bg-linear-to-b before:from-white/[0.02] before:to-transparent after:absolute after:inset-0 after:z-[-1] after:rounded-[2rem] after:bg-linear-to-t after:from-black/30 after:to-transparent";

const glassIcon =
  "border-border/50 from-card to-background relative flex size-10 items-center justify-center rounded-xl border bg-linear-to-br shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_1px_3px_rgba(0,0,0,0.3),inset_0_-1px_1px_rgba(0,0,0,0.2)]";

const featureBadge =
  "border-primary/30 from-primary/15 to-primary/5 relative inline-flex items-center justify-center rounded-full border bg-linear-to-br px-3 py-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_1px_3px_rgba(0,0,0,0.3),inset_0_-1px_1px_rgba(0,0,0,0.2)]";

const morphTexts = ["smarter", "safer", "faster", "stronger", "better"];

function FlickeringGrid({
  className,
  squareSize = 4,
  gridGap = 6,
  maxOpacity = 0.15,
  flickerChance = 0.1,
}: {
  className?: string;
  squareSize?: number;
  gridGap?: number;
  maxOpacity?: number;
  flickerChance?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<{ opacity: number; target: number }[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0,
      h = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(w / (squareSize + gridGap));
      const rows = Math.ceil(h / (squareSize + gridGap));
      if (gridRef.current.length !== cols * rows) {
        gridRef.current = Array.from({ length: cols * rows }, () => ({
          opacity: Math.random() * maxOpacity,
          target: Math.random() * maxOpacity,
        }));
      }
    };

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    let last = 0;
    const draw = (time: number) => {
      const dt = Math.min((time - last) / 1000, 0.1);
      last = time;
      const cols = Math.ceil(w / (squareSize + gridGap));
      const rows = Math.ceil(h / (squareSize + gridGap));
      ctx.clearRect(0, 0, w, h);
      const r = 61,
        g = 154,
        b = 110;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          const cell = gridRef.current[idx];
          if (!cell) continue;
          if (Math.random() < flickerChance * dt) cell.target = Math.random() * maxOpacity;
          cell.opacity += (cell.target - cell.opacity) * Math.min(dt * 5, 1);
          ctx.fillStyle = `rgba(${r},${g},${b},${cell.opacity})`;
          ctx.fillRect(col * (squareSize + gridGap), row * (squareSize + gridGap), squareSize, squareSize);
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [squareSize, gridGap, maxOpacity, flickerChance]);

  return <canvas ref={canvasRef} className={className} />;
}

function Particles({
  className,
  quantity = 60,
  size = 0.6,
}: {
  className?: string;
  quantity?: number;
  size?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<
    {
      x: number;
      y: number;
      tx: number;
      ty: number;
      size: number;
      alpha: number;
      targetAlpha: number;
      dx: number;
      dy: number;
    }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0,
      h = 0;

    const initParticles = () => {
      particlesRef.current = Array.from({ length: quantity }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        tx: 0,
        ty: 0,
        size: Math.floor(2 * Math.random()) + size,
        alpha: 0,
        targetAlpha: 0.6 * Math.random() + 0.1,
        dx: (Math.random() - 0.5) * 0.1,
        dy: (Math.random() - 0.5) * 0.1,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const r = 61,
        g = 154,
        b = 110;
      for (const p of particlesRef.current) {
        p.alpha += (p.targetAlpha - p.alpha) * 0.02;
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
        p.tx += (0 - p.tx) * 0.1;
        p.ty += (0 - p.ty) * 0.1;
        ctx.beginPath();
        ctx.arc(p.x + p.tx, p.y + p.ty, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [quantity, size]);

  return <canvas ref={canvasRef} className={className} />;
}

function MorphingText({ texts }: { texts: string[] }) {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const rafRef = useRef<number>(0);
  const accumulatorRef = useRef(0);

  useEffect(() => {
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;
    const container = containerRef.current;
    if (!text1 || !text2 || !container) return;

    text1.textContent = texts[0];

    let lastTime = 0;
    const animate = (time: number) => {
      const dt = lastTime ? (time - lastTime) / 1000 : 0;
      lastTime = time;
      accumulatorRef.current += dt;

      if (accumulatorRef.current >= 1.5) {
        accumulatorRef.current = 0;
        const duration = 500;
        const start = performance.now();

        const step = (now: number) => {
          const elapsed = now - start;
          const r = Math.min(elapsed / duration, 1);

          if (text2 && text1 && container) {
            text2.style.filter = `blur(${Math.min(8 / r - 8, 100)}px)`;
            text2.style.opacity = `${Math.pow(r, 0.4)}`;
            text1.style.filter = `blur(${Math.min(8 / (1 - r) - 8, 100)}px)`;
            text1.style.opacity = `${Math.pow(1 - r, 0.4)}`;
            container.style.filter = "url(#threshold) blur(0.6px)";

            const idx = indexRef.current;
            text1.textContent = texts[idx % texts.length];
            text2.textContent = texts[(idx + 1) % texts.length];
          }

          if (r < 1) {
            requestAnimationFrame(step);
          } else {
            indexRef.current++;
            if (text1) {
              text1.textContent = texts[indexRef.current % texts.length];
              text1.style.filter = "none";
              text1.style.opacity = "1";
            }
            if (text2) {
              text2.style.filter = "none";
              text2.style.opacity = "0";
            }
            if (container) container.style.filter = "none";
          }
        };
        requestAnimationFrame(step);
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [texts]);

  return (
    <div className="relative shrink-0">
      <span className="text-primary invisible block text-[46px] leading-none font-bold tracking-tighter whitespace-nowrap lg:text-[58px] xl:text-[64px]">
        smarter
      </span>
      <div
        ref={containerRef}
        className="text-primary absolute inset-0 h-full w-full max-w-none text-center text-[40px] leading-none tracking-tighter whitespace-nowrap font-sans font-bold transition-[filter] duration-500 md:h-24 lg:text-[58px] xl:text-[64px]"
      >
        <span ref={text1Ref} className="absolute inset-x-0 top-0 m-auto inline-block w-full" />
        <span ref={text2Ref} className="absolute inset-x-0 top-0 m-auto inline-block w-full" />
        <svg className="fixed h-0 w-0" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="threshold">
              <feColorMatrix
                in="SourceGraphic"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Marquee({
  children,
  className = "",
  reverse = false,
  pauseOnHover = false,
  repeat = 4,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
}) {
  return (
    <div
      className={`group flex overflow-hidden [--duration:35s] [--gap:50px] ${className}`}
      style={{ gap: "var(--gap)" }}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={`flex shrink-0 justify-around ${reverse ? "[animation-direction:reverse]" : ""} animate-marquee flex-row${pauseOnHover ? " group-hover:[animation-play-state:paused]" : ""}`}
          style={{ gap: "var(--gap)" }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 70%)",
        }}
      >
        <FlickeringGrid
          className="absolute inset-0 size-full"
          squareSize={4}
          gridGap={6}
          maxOpacity={0.15}
          flickerChance={0.1}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-8 text-center">
        <h1 className="text-[46px] font-bold leading-none tracking-tighter lg:text-[58px] xl:text-[64px]">
          <span className="bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
            Run your server
          </span>
          <br className="hidden md:block" />{" "}
          <MorphingText texts={morphTexts} />
          <br className="hidden md:block" />{" "}
          <span className="bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
            than ever.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-[650px] text-lg text-muted-foreground lg:text-xl">
          Meet the bot built for modern Discord communities. Automate moderation, reward engagement, and unlock
          powerful tools &mdash; all from one place.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href={OAUTH_URL}
            className="border-primary/50 from-primary/20 to-primary/5 text-primary inline-flex items-center gap-2 rounded-full border bg-linear-to-br px-6 py-2.5 font-medium transition-all hover:from-primary/25 hover:to-primary/10"
          >
            Add to Discord
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#features"
            className="border-border/50 from-card to-background text-muted-foreground inline-flex items-center gap-2 rounded-full border bg-linear-to-br px-6 py-2.5 font-medium transition-all hover:text-foreground"
          >
            <Sparkles className="h-4 w-4" />
            Explore Features
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatsLine() {
  return (
    <div className="relative z-10 -mt-16">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-6 text-sm tabular-nums text-muted-foreground">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          Powering <strong className="font-semibold text-foreground">163,636</strong> users
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <Server className="h-4 w-4 text-primary" />
          across <strong className="font-semibold text-foreground">80</strong> communities
        </div>
      </div>
    </div>
  );
}

function ScrollingMarquee() {
  const guilds = [
    { name: "Gaming Hub", members: "12.4k" },
    { name: "Chill Zone", members: "8.2k" },
    { name: "Art Studio", members: "5.6k" },
    { name: "Music Lounge", members: "15.1k" },
    { name: "Code Corner", members: "3.8k" },
    { name: "Anime World", members: "9.7k" },
    { name: "Sports Bar", members: "6.3k" },
    { name: "Book Club", members: "2.1k" },
  ];

  return (
    <div className="relative z-10 mx-auto mt-6 w-full max-w-[78rem] px-4">
      <div className="pointer-events-none absolute -top-[25px] -bottom-[25px] -left-[40px] z-10">
        <div className="h-full w-[125px] rounded-full bg-background blur-[10px]" />
      </div>
      <div className="w-full overflow-hidden">
        <Marquee repeat={4} pauseOnHover>
          {guilds.map((g) => (
            <div key={g.name} className="flex shrink-0 items-center">
              <div className="flex size-14 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-muted-foreground md:size-16">
                {g.name[0]}
              </div>
              <div className="ml-5">
                <p className="flex items-center text-base font-semibold tracking-tight md:text-lg">{g.name}</p>
                <p className="text-xs font-medium text-muted-foreground md:text-sm">{g.members} members</p>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
      <div className="pointer-events-none absolute -top-[25px] -bottom-[25px] -right-[40px] z-10">
        <div className="h-full w-[125px] rounded-full bg-background blur-[10px]" />
      </div>
    </div>
  );
}

function LastFmCard() {
  return (
    <div className={`${glassCard} md:col-span-2`}>
      <div className="flex items-center gap-3">
        <div className={glassIcon}>
          <Music className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">Last.fm Integration</h3>
          <p className="text-sm text-muted-foreground">Track your music in Discord</p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/60 p-3">
          <Image
            src="https://r2.bender.best/assets/variable/lastfm/album.png"
            alt="After Hours"
            width={56}
            height={56}
            className="size-14 shrink-0 rounded-xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">Blinding Lights</p>
            <p className="truncate text-xs text-muted-foreground">The Weeknd &mdash; After Hours</p>
          </div>
          <span className={featureBadge}>
            <span className="text-xs font-medium text-primary">Now Playing</span>
          </span>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>2:10 / 3:20</span>
            <span>142 Scrobbles</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-primary to-emerald-400" />
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Recently played</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { song: "Starboy", artist: "The Weeknd" },
              { song: "Save Your Tears", artist: "The Weeknd" },
              { song: "Die For You", artist: "The Weeknd" },
            ].map((t) => (
              <div key={t.song} className="flex items-center gap-2 rounded-lg bg-secondary/60 p-2">
                <Image
                  src="https://r2.bender.best/assets/variable/lastfm/artist.png"
                  alt={t.artist}
                  width={36}
                  height={36}
                  className="size-9 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-foreground">{t.song}</p>
                  <p className="truncate text-[10px] text-muted-foreground">{t.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AntinukeCard() {
  const [toggles, setToggles] = useState([true, true, false]);

  return (
    <div className={glassCard}>
      <div className="flex items-center gap-3">
        <div className={glassIcon}>
          <Fingerprint className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">Antinuke</h3>
          <p className="text-sm text-muted-foreground">Real-time threat detection</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Real-time detection and punishment for mass deletions, bans, role changes, and vanity theft. Configure
        thresholds per action.
      </p>
      <div className="mt-3 space-y-2">
        {[
          { action: "Role Delete", threshold: "3 / 10s", punishment: "Ban" },
          { action: "Channel Delete", threshold: "5 / 30s", punishment: "Ban" },
          { action: "Mass Ban", threshold: "4 / 15s", punishment: "Ban", disabled: true },
        ].map((rule, i) => (
          <div
            key={rule.action}
            className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/60 px-3 py-2.5"
          >
            <div className="flex items-center gap-2">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={toggles[i]}
                  onChange={() => {
                    const next = [...toggles];
                    next[i] = !next[i];
                    setToggles(next);
                  }}
                  className="sr-only"
                  disabled={rule.disabled}
                />
                <div
                  className={`h-5 w-9 rounded-full transition-colors ${toggles[i] ? "bg-primary" : "bg-muted"} ${rule.disabled ? "opacity-40" : ""}`}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transition-transform ${toggles[i] ? "translate-x-[18px]" : "translate-x-[2px]"} mt-[1px]`}
                  />
                </div>
              </label>
              <span className="text-xs font-medium text-foreground">{rule.action}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{rule.threshold}</span>
              <Badge variant="destructive">{rule.punishment}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EconomyCard() {
  return (
    <div className={glassCard}>
      <div className="flex items-center gap-3">
        <div className={glassIcon}>
          <Coins className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">Economy</h3>
          <p className="text-sm text-muted-foreground">Virtual currency & rewards</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Give your members something to grind for with virtual currency, daily rewards, a shop system, and competitive
        gambling games.
      </p>
      <div className="mt-3 rounded-xl border border-border/50 bg-secondary/60 p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Balance</span>
          <span className="text-lg font-bold text-primary">24,850 coins</span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary">Level 12</Badge>
        </div>
        <div className="mt-2 space-y-1 border-t border-border pt-2">
          {[
            { label: "Hourly", value: "+120" },
            { label: "6h", value: "+750" },
            { label: "Daily", value: "+2,500" },
          ].map((b) => (
            <div key={b.label} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{b.label}</span>
              <span className="text-primary">{b.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VoicemasterCard() {
  return (
    <div className={glassCard}>
      <div className="flex items-center gap-3">
        <div className={glassIcon}>
          <Headphones className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">Voicemaster</h3>
          <p className="text-sm text-muted-foreground">Dynamic voice channels</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Members create their own temporary voice channels on demand. Rename, set limits, lock &mdash; no admin needed.
      </p>
      <div className="mt-3 space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Active channels</p>
        {[
          { name: "visics's channel", count: 3 },
          { name: "chill zone", count: 5 },
        ].map((ch) => (
          <div
            key={ch.name}
            className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/60 px-3 py-2"
          >
            <span className="text-xs font-medium text-foreground">{ch.name}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" /> {ch.count}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["Rename", "Limit", "Lock", "Kick"].map((action) => (
          <span
            key={action}
            className="rounded-md border border-border/50 bg-secondary/60 px-2.5 py-1 text-[10px] font-medium text-muted-foreground"
          >
            {action}
          </span>
        ))}
      </div>
    </div>
  );
}

function GiveawaysCard() {
  return (
    <div className={glassCard}>
      <div className="flex items-center gap-3">
        <div className={glassIcon}>
          <Gift className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">Giveaways</h3>
          <p className="text-sm text-muted-foreground">Timed giveaways & rerolls</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Create timed giveaways with role requirements, multiple winners, bonus entries, and easy rerolls &mdash; all from
        the dashboard.
      </p>
      <div className="mt-3 space-y-2">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Nitro Giveaway</span>
            <Badge variant="success">Active</Badge>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>42 entries</span>
            <span>Ends in 2h 15m</span>
          </div>
        </div>
        <div className="rounded-xl border border-border/50 bg-secondary/60 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">VIP Role</span>
            <Badge variant="muted">Ended</Badge>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>128 entries</span>
            <span>Winner: Sarah</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <span className={featureBadge}>
          <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-medium text-primary">Features</span>
        </span>
        <h2 className="mt-4 bg-gradient-to-r from-foreground via-foreground to-foreground/50 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
          Everything Your Server Needs
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Powerful features to manage, entertain, and grow your Discord community.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <LastFmCard />
        <AntinukeCard />
        <EconomyCard />
        <VoicemasterCard />
        <GiveawaysCard />
      </div>
    </section>
  );
}

function WaveSeparator() {
  return (
    <div className="relative left-1/2 mb-20 flex w-screen -translate-x-1/2 justify-center lg:mb-24">
      <svg viewBox="0 0 1508 230" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[230px] w-screen" preserveAspectRatio="none">
        <path d="M1 150.533C647.552 -13.2082 742.359 -35.2261 1241.5 108.685C1319.05 131.042 1406.35 157.405 1507 187.863" stroke="url(#sep0)" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="1 3" strokeLinecap="round" />
        <path d="M1 144.533C647.552 -19.2082 742.359 -41.2261 1241.5 102.685C1319.05 125.042 1406.35 151.405 1507 181.863" stroke="url(#sep0)" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="1 3" strokeLinecap="round" />
        <path d="M1 138.533C647.552 -25.2082 742.359 -47.2261 1241.5 96.6845C1319.05 119.042 1406.35 145.405 1507 175.863" stroke="url(#sep0)" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="1 3" strokeLinecap="round" />
        <path d="M1 156.39C748 -32.7894 758.5 -32.7894 1507 193.721" stroke="url(#sep0)" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="1 3" strokeLinecap="round" />
        <path d="M1 162.535C748 -26.6449 758.5 -26.6449 1507 199.865" stroke="url(#sep0)" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="1 3" strokeLinecap="round" />
        <path d="M1 168.101C748 -21.0785 758.5 -21.0785 1507 205.432" stroke="url(#sep0)" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="1 3" strokeLinecap="round" />
        <path d="M1 173.957C748 -15.223 758.5 -15.223 1507 211.287" stroke="url(#sep0)" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="1 3" strokeLinecap="round" />
        <path d="M1 179.814C748 -9.36561 758.5 -9.36562 1507 217.145" stroke="url(#sep0)" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="1 3" strokeLinecap="round" />
        <path d="M1 185.67C748 -3.51014 758.5 -3.51015 1507 223" stroke="url(#sep0)" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="1 3" strokeLinecap="round" />
        <path d="M1 191.533C748 2.35314 758.5 2.35313 1507 228.863" stroke="url(#sep0)" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="1 3" strokeLinecap="round" />
        <defs>
          <linearGradient id="sep0" x1="1" y1="150" x2="1507" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3d9a6e" />
            <stop offset="0.25" stopColor="#3d9a6e" />
            <stop offset="0.4" stopColor="#3d9a6e" stopOpacity="0.3" />
            <stop offset="0.6" stopColor="#3d9a6e" />
            <stop offset="0.75" stopColor="#3d9a6e" />
            <stop offset="1" stopColor="#3d9a6e" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function ShowcaseSubCard({ icon: Icon, label, desc }: { icon: React.ElementType; label: string; desc: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-secondary/60 p-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <p className="text-xs font-semibold text-foreground">{label}</p>
      </div>
      <p className="mt-1 text-[10px] text-muted-foreground">{desc}</p>
    </div>
  );
}

function ModerationShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-2">
            <div className={glassIcon}>
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary">Moderation</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">Keep your server safe</h2>
          <p className="mt-4 text-muted-foreground">
            Powerful auto-mod, detailed logging, warnings, bans, and mutes &mdash; everything you need to protect your
            community from spam, raids, and bad actors.
          </p>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <ShowcaseSubCard icon={Shield} label="Auto-Mod" desc="Spam & link filtering" />
            <ShowcaseSubCard icon={Fingerprint} label="Raid Protection" desc="Mass-join detection" />
            <ShowcaseSubCard icon={Search} label="Custom Filters" desc="Block words & patterns" />
            <ShowcaseSubCard icon={ShieldCheck} label="Mod Roles" desc="Role-based permissions" />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-success/20 bg-success/5 px-3 py-2">
            <span className="text-xs text-muted-foreground">Protection Status</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium text-success">All modules operational</span>
            </div>
          </div>
          <div className="text-right text-xs text-muted-foreground">99% Protection</div>
        </div>
      </div>
    </section>
  );
}

function LevelingShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <ShowcaseSubCard icon={Hash} label="Text XP" desc="15 XP per message" />
            <ShowcaseSubCard icon={Volume2} label="Voice XP" desc="5 XP per minute" />
            <ShowcaseSubCard icon={Trophy} label="Role Rewards" desc="4 roles configured" />
            <ShowcaseSubCard icon={TrendingUp} label="Leaderboard" desc="Public ranking" />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-success/20 bg-success/5 px-3 py-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-success" />
              <span className="text-xs text-muted-foreground">Server Activity</span>
            </div>
            <span className="text-xs font-medium text-success">47 active</span>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="flex items-center gap-2">
            <div className={glassIcon}>
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary">Leveling</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">Reward active members</h2>
          <p className="mt-4 text-muted-foreground">
            Members earn XP by chatting and spending time in voice channels. Set up role rewards, custom level-up
            messages, and leaderboards to keep everyone engaged.
          </p>
        </div>
      </div>
    </section>
  );
}

function VoicemasterShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-2">
            <div className={glassIcon}>
              <Headphones className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary">Voicemaster</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">Dynamic voice channels</h2>
          <p className="mt-4 text-muted-foreground">
            Members create their own temporary voice channels on demand. They can rename, set limits, lock, and fully
            manage their own VC &mdash; no admin needed.
          </p>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <ShowcaseSubCard icon={Volume2} label="Temp Channels" desc="Created on demand" />
            <ShowcaseSubCard icon={Settings} label="Full Control" desc="Rename, lock, limit" />
            <ShowcaseSubCard icon={RotateCw} label="Auto Cleanup" desc="Deleted when empty" />
            <ShowcaseSubCard icon={Lock} label="Permissions" desc="Owner manages access" />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-3 py-2">
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Active Channels</span>
            </div>
            <span className="text-xs font-medium text-primary">12 channels</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const featureTiles = [
    { icon: Shield, label: "Moderation" },
    { icon: Coins, label: "Economy" },
    { icon: Gift, label: "Giveaways" },
    { icon: Trophy, label: "Levels" },
    { icon: Gift, label: "Tickets" },
    { icon: Headphones, label: "Voice" },
  ];

  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Particles className="size-full" quantity={60} size={0.6} />
      </div>
      <div className="container relative z-10 mx-auto px-4 py-24">
        <div className="border-border/50 from-card to-background relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-[3rem] border bg-linear-to-br p-10 py-14 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_1px_3px_rgba(0,0,0,0.3),inset_0_-1px_1px_rgba(0,0,0,0.2)] before:absolute before:inset-0 before:-z-10 before:rounded-[3rem] before:bg-linear-to-b before:from-white/[0.02] before:to-transparent after:absolute after:inset-0 after:z-[-1] after:rounded-[3rem] after:bg-linear-to-t after:from-black/30 after:to-transparent">
          <div className="absolute rotate-[35deg] opacity-50">
            {Array.from({ length: 15 }).map((_, i) => (
              <Marquee
                key={i}
                reverse={i % 2 === 1}
                pauseOnHover
                repeat={7}
                className="[--duration:20s] [--gap:20px]"
              >
                {featureTiles.map((tile) => (
                  <figure
                    key={tile.label}
                    className="relative w-32 cursor-pointer overflow-hidden rounded-xl border border-border bg-background p-4"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <tile.icon className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">{tile.label}</span>
                    </div>
                  </figure>
                ))}
              </Marquee>
            ))}
          </div>

          <div className="border-border/50 from-card to-background z-10 mx-auto flex size-24 items-center justify-center rounded-[2rem] border bg-linear-to-br p-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_2px_6px_rgba(0,0,0,0.4),inset_0_-1px_1px_rgba(0,0,0,0.2)] backdrop-blur-md lg:size-32">
            <Sparkles className="text-5xl text-primary lg:text-7xl" />
          </div>

          <div className="z-10 mt-6 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold lg:text-4xl">Ready to Supercharge Your Server?</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Join thousands of servers already using Bender Bot. Add it in seconds and see the difference.
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <Link
                href={OAUTH_URL}
                className="border-primary/50 from-primary/20 to-primary/5 text-primary inline-flex items-center gap-2 rounded-full border bg-linear-to-br px-6 py-2.5 font-medium transition-all hover:from-primary/25 hover:to-primary/10"
              >
                Add to Discord
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="https://docs.bender.best"
                className="border-border/50 from-card to-background text-muted-foreground inline-flex items-center gap-2 rounded-full border bg-linear-to-br px-6 py-2.5 font-medium transition-all hover:text-foreground"
              >
                <Code className="h-4 w-4" />
                View Docs
              </Link>
            </div>
          </div>

          <div className="to-background absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-70%" />
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsLine />
      <ScrollingMarquee />
      <FeaturesSection />
      <WaveSeparator />
      <ModerationShowcase />
      <LevelingShowcase />
      <VoicemasterShowcase />
      <CTASection />
    </>
  );
}
