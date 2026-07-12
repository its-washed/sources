"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronDown } from "lucide-react";

const glassCard =
  "border-border/50 from-card to-background hover:border-border/80 relative rounded-[2rem] border bg-linear-to-br p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_1px_3px_rgba(0,0,0,0.3),inset_0_-1px_1px_rgba(0,0,0,0.2)] transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-[1.5rem] before:bg-linear-to-b before:from-white/[0.02] before:to-transparent after:absolute after:inset-0 after:z-[-1] after:rounded-[2rem] after:bg-linear-to-t after:from-black/30 after:to-transparent";

const comparisonData = [
  {
    section: "Leveling",
    features: [
      { name: "XP Bonuses", free: "10", premium: "100" },
      { name: "Rewards", free: "10", premium: "100" },
      { name: "Cooldowns", free: "5", premium: "10" },
      { name: "XP Boosts", free: "5", premium: "25" },
    ],
  },
  {
    section: "Messages & Embeds",
    features: [
      { name: "Welcome/Goodbye/Boost Messages", free: "3", premium: "10" },
      { name: "Embed Templates", free: "100", premium: "500" },
      { name: "Actions per Component", free: "5", premium: "10" },
    ],
  },
  {
    section: "Tickets",
    features: [
      { name: "Panels", free: "3", premium: "10" },
      { name: "Topics", free: "5", premium: "25" },
      { name: "Inactivity Rules", free: "3", premium: "5" },
    ],
  },
  {
    section: "Rewards",
    features: [
      { name: "Roles per Reward", free: "1", premium: "3" },
      { name: "Messages per Reward", free: "1", premium: "3" },
    ],
  },
  {
    section: "Giveaways",
    features: [
      { name: "Draft Giveaways", free: "5", premium: "10" },
      { name: "Active Giveaways", free: "3", premium: "5" },
      { name: "Bonus Entry Roles", free: "1", premium: "5" },
    ],
  },
  {
    section: "Server List",
    features: [
      { name: "Tags", free: "5", premium: "10" },
      { name: "Bump Cooldown (min)", free: "120", premium: "60" },
      { name: "Bump Rewards", free: "5", premium: "15" },
      { name: "Birthday Roles", free: "1", premium: "3" },
    ],
  },
  {
    section: "Notifications",
    features: [
      { name: "YouTube Subscriptions", free: "3", premium: "10" },
      { name: "Twitch Subscriptions", free: "3", premium: "10" },
      { name: "TikTok Subscriptions", free: "3", premium: "10" },
      { name: "Kick Subscriptions", free: "3", premium: "10" },
      { name: "Starboards", free: "3", premium: "10" },
      { name: "Temp Voice Hubs", free: "1", premium: "3" },
      { name: "Automations per Server", free: "5", premium: "25" },
      { name: "Invite Rewards", free: "10", premium: "25" },
    ],
  },
  {
    section: "Warnings",
    features: [
      { name: "Warning Rules", free: "5", premium: "15" },
      { name: "Warning Rewards", free: "5", premium: "15" },
    ],
  },
  {
    section: "Auto Roles",
    features: [
      { name: "Join Roles", free: "10", premium: "25" },
      { name: "Boost Roles", free: "10", premium: "25" },
      { name: "Connections", free: "5", premium: "15" },
      { name: "Suggestion Types", free: "1", premium: "3" },
      { name: "Counters per Server", free: "3", premium: "10" },
      { name: "Aliases per Command", free: "5", premium: "10" },
      { name: "Priority Support", free: "✗", premium: "✓" },
    ],
  },
];

const faqs = [
  {
    question: "What is Premium?",
    answer: "Premium unlocks exclusive features and higher limits for your server, including priority support, advanced automation, and more customization options.",
  },
  {
    question: "How can I upgrade?",
    answer: "You can upgrade directly from the dashboard by selecting a plan above. Payment is processed securely and your benefits activate instantly.",
  },
  {
    question: "Is this a one-time payment?",
    answer: "Yes, Premium is a one-time payment — no recurring charges or subscriptions. Once purchased, your benefits are permanently unlocked.",
  },
  {
    question: "Does Premium apply to the entire server?",
    answer: "Yes, once Premium is activated for a server, all members benefit from the upgraded features and higher limits.",
  },
];

function renderCellValue(value: string, isPremium: boolean) {
  if (value === "✗") {
    return (
      <X className="mx-auto h-4 w-4 text-destructive" />
    );
  }
  if (value === "✓") {
    return (
      <Check className="mx-auto h-4 w-4 text-success" />
    );
  }
  if (isPremium) {
    return <span className="text-primary font-semibold">{value}</span>;
  }
  return <span className="text-muted-foreground">{value}</span>;
}

export default function PremiumPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground">Upgrade Your Experience</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Unlock higher limits, exclusive features, and priority support to take your server to the next level.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className={glassCard}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Free</h3>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-bold text-foreground">0€</span>
          </div>
          <ul className="mb-8 space-y-3">
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <Check className="h-4 w-4 shrink-0 text-muted-foreground" />
              All core features
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <Check className="h-4 w-4 shrink-0 text-muted-foreground" />
              Community Support
            </li>
          </ul>
          <Button variant="outline" size="lg" className="w-full" href="https://discord.com/oauth2/authorize?client_id=1472242893400838255&scope=bot+applications.commands&permissions=8">
            Add to Discord
          </Button>
        </div>

        <div className={`${glassCard} border-primary/30 bg-primary/5`}>
          <div className="absolute top-4 right-4">
            <Badge variant="success">Most Popular</Badge>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">Premium</h3>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-bold text-foreground">4.99€</span>
            <span className="ml-2 text-sm text-muted-foreground">lifetime</span>
          </div>
          <ul className="mb-8 space-y-3">
            <li className="flex items-center gap-3 text-sm text-foreground">
              <Check className="h-4 w-4 shrink-0 text-foreground" />
              Everything in Free
            </li>
            <li className="flex items-center gap-3 text-sm text-primary">
              <Check className="h-4 w-4 shrink-0 text-primary" />
              Higher Limits
            </li>
            <li className="flex items-center gap-3 text-sm text-primary">
              <Check className="h-4 w-4 shrink-0 text-primary" />
              Priority Support
            </li>
          </ul>
          <Button variant="primary" size="lg" className="w-full">
            Get Premium
          </Button>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Feature Comparison</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {comparisonData.map((section) => (
            <div key={section.section} className={glassCard}>
              <div className="mb-4 flex items-center gap-2">
                <h3 className="text-base font-semibold text-foreground">{section.section}</h3>
                <Badge variant="muted">{section.features.length}</Badge>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="pb-2 text-left font-medium text-muted-foreground">Feature</th>
                    <th className="pb-2 text-center font-medium text-muted-foreground">Free</th>
                    <th className="pb-2 text-center font-medium text-primary">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {section.features.map((feat, fIdx) => (
                    <tr key={fIdx} className={fIdx < section.features.length - 1 ? "border-b border-border/30" : ""}>
                      <td className="py-2.5 text-muted-foreground">{feat.name}</td>
                      <td className="py-2.5 text-center">{renderCellValue(feat.free, false)}</td>
                      <td className="py-2.5 text-center">{renderCellValue(feat.premium, true)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className={glassCard}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-foreground">{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openFaq === i ? "mt-3 max-h-40" : "max-h-0"
                }`}
              >
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
