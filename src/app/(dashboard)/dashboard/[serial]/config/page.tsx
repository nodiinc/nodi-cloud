import Link from "next/link";

export default async function GatewayConfigPage({
  params,
}: {
  params: Promise<{ serial: string }>;
}) {
  const { serial } = await params;

  return (
    <div>
      <div className="flex items-center gap-4">
        <Link
          href={`/gateways/${serial}`}
          className="text-muted hover:text-foreground transition-colors"
        >
          &larr;
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Remote Configuration
          </h1>
          <p className="mt-1 text-sm text-muted">
            <span className="font-mono">{serial}</span> &middot; Factory A - Line 1
          </p>
        </div>
      </div>

      <div className="mt-8 flex h-[600px] items-center justify-center rounded-xl border border-border bg-card">
        <div className="text-center">
          <p className="text-muted">Gateway configuration interface will be embedded here.</p>
          <p className="mt-2 text-sm text-muted">
            Remote access to the gateway&apos;s internal configuration page via secure tunnel.
          </p>
        </div>
      </div>
    </div>
  );
}
