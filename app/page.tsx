import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link2, ShieldCheck, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Instant URL Shortening",
    description:
      "Turn any long URL into a clean, shareable short link in seconds. No friction, no hassle.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description:
      "Your links are scoped to your account. Only you can view and manage them.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Redirects",
    description:
      "Built on edge infrastructure so every redirect happens in milliseconds.",
  },
  {
    icon: Globe,
    title: "Share Anywhere Now",
    description:
      "Short links work everywhere — social media, emails, QR codes, you name it.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-8 px-6 py-24 text-center md:py-36">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-border",
            "bg-muted px-3 py-1 text-xs font-medium text-muted-foreground",
          )}
        >
          <Link2 className="size-3" />
          Simple · Fast · Reliable
        </span>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Shorten links.
          <br />
          <span className="text-muted-foreground">Share them anywhere.</span>
        </h1>

        <p className="max-w-xl text-lg text-muted-foreground">
          LinkShort turns any long URL into a clean short link you can share
          anywhere. Manage all your links from one dashboard.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <SignUpButton mode="modal">
            <Button size="lg" className="rounded-full px-8">
              Sign Up!
            </Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Sign in
            </Button>
          </SignInButton>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything you need to manage links
            </h2>
            <p className="mt-3 text-muted-foreground">
              A focused toolkit — nothing you don&apos;t need, everything you
              do.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className={cn(
                  "flex flex-col gap-3 rounded-xl border border-border",
                  "bg-card p-6 text-card-foreground",
                )}
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to shorten your first link?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Create a free account and start sharing smarter today.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <SignUpButton mode="modal">
            <Button size="lg" className="rounded-full px-8">
              Sign Up!
            </Button>
          </SignUpButton>
        </div>
      </section>
    </div>
  );
}
