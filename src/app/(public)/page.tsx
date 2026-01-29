import Image from "next/image";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

const PROTOCOLS = [
  { name: "MQTT", category: "Cloud" },
  { name: "Sparkplug B", category: "Cloud" },
  { name: "OPC UA", category: "Cloud" },
  { name: "Kafka", category: "Cloud" },
  { name: "REST API", category: "Cloud" },
  { name: "Modbus TCP", category: "Field" },
  { name: "Modbus RTU", category: "Field" },
  { name: "SQL", category: "Field" },
  { name: "TSDB", category: "Field" },
  { name: "Fieldbus", category: "Field" },
];

const FEATURES = [
  {
    title: "Real-time Monitoring",
    description: "Monitor all connected devices and sensors with sub-second latency.",
  },
  {
    title: "Bidirectional Control",
    description: "Not just data collection — send commands and configurations back to field devices.",
  },
  {
    title: "Auto Recovery",
    description: "FSM-based lifecycle management with automatic reconnection and fault recovery.",
  },
  {
    title: "Protocol Agnostic",
    description: "10+ industrial protocols supported. Connect any device, any system.",
  },
  {
    title: "Edge Intelligence",
    description: "Process and filter data at the edge before sending to cloud. Reduce bandwidth, increase speed.",
  },
  {
    title: "Remote Configuration",
    description: "Configure and update your gateways remotely through the cloud dashboard.",
  },
];

export default async function LandingPage() {
  const session = await auth();

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-background)]/80 px-6 backdrop-blur-lg md:px-12">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/nodi-logo-symbol.png" alt="nodi" width={32} height={32} className="rounded-md" />
          <span className="text-lg font-bold tracking-tight text-[var(--color-foreground)]">Nodi</span>
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/platform" className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] md:block">
            Platform
          </Link>
          <Link href="/solutions" className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] md:block">
            Solutions
          </Link>
          <Link href="/integrations" className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] md:block">
            Integrations
          </Link>
          <Link href="/resources" className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] lg:block">
            Resources
          </Link>
          <Link href="/company" className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)] lg:block">
            Company
          </Link>

          {session?.user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/nodi-edge"
                className="flex items-center gap-2 rounded-full border border-[var(--color-border)] pl-1 pr-4 py-1 text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-brand-blue)] flex items-center justify-center text-black text-xs font-semibold">
                  {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-[var(--color-foreground)]">Dashboard</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                >
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Background gradient glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[var(--color-brand-blue)]/10 to-[var(--color-brand-cyan)]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <h1 className="text-5xl font-semibold leading-tight tracking-tight text-[var(--color-foreground)] md:text-7xl">
            Edge data powers
            <br />
            <span className="bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] bg-clip-text text-transparent">
              Industrial IoT
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)] md:text-xl">
            Connect, monitor, and control your industrial devices from anywhere.
            One gateway platform for all your field protocols.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] px-8 py-3 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90"
            >
              Book a Demo
            </Link>
            <Link
              href="/platform"
              className="rounded-full border border-[var(--color-border)] px-8 py-3 text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-4xl">
            Built for Industrial Scale
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-muted)]">
            Everything you need to bridge the gap between field devices and the cloud.
          </p>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all hover:border-[var(--color-brand-cyan)]/30 hover:bg-[var(--color-card-hover)]"
              >
                <h3 className="text-lg font-medium text-[var(--color-foreground)]">{feature.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocols Section */}
      <section className="py-24 px-6 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-4xl">
            Universal Protocol Support
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-muted)]">
            From cloud messaging to fieldbus — one platform connects them all.
          </p>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PROTOCOLS.map((protocol) => (
              <div
                key={protocol.name}
                className="flex flex-col items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-center transition-all hover:border-[var(--color-brand-cyan)]/30 hover:bg-[var(--color-card-hover)]"
              >
                <span className="font-mono text-sm font-medium text-[var(--color-foreground)]">{protocol.name}</span>
                <span className="mt-1 text-xs text-[var(--color-muted)]">{protocol.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-4xl">
            Ready to connect your factory?
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            Get started with nodi edge gateway. Contact us for a demo and pricing.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] px-8 py-3 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-12 px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <Image src="/nodi-logo-symbol.png" alt="nodi" width={24} height={24} className="rounded" />
            <span className="text-sm text-[var(--color-muted)]">Bring your nodes into the box</span>
          </div>
          <p className="text-sm text-[var(--color-muted)]">&copy; 2026 nodi. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
