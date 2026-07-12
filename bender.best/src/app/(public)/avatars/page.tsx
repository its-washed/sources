import { Camera, Lock } from "lucide-react";
import Link from "next/link";

export default function AvatarsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Avatar History</h1>
        <p className="mt-2 text-muted-foreground">Track Discord avatar changes over time.</p>
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/20">
          <Camera className="h-8 w-8 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">Search for a user to view their avatar history.</p>
        <input
          type="text"
          placeholder="Enter Discord User ID..."
          className="w-full max-w-md rounded-xl border border-border/50 bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5" />
          <Link href="/api/auth/discord" className="text-primary hover:underline">Login with Discord</Link> to track avatars
        </p>
      </div>
    </div>
  );
}
