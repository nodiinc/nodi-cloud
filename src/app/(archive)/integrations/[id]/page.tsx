import Link from "next/link";

export default async function IntegrationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Mock data - will be replaced with database lookup
  const integration = {
    id,
    name: "S7-1200",
    vendor: "Siemens",
    protocol: "OPC UA",
    category: "PLC",
    description: "Siemens S7-1200 compact controller for simple automation tasks. Supports OPC UA server for direct communication.",
    configs: [
      { name: "Basic I/O Monitoring", tags: 24, updated: "2026-01-15" },
      { name: "Production Counter", tags: 8, updated: "2026-01-10" },
      { name: "Energy Monitoring", tags: 16, updated: "2025-12-28" },
    ],
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <Link
          href="/integrations"
          className="text-muted hover:text-foreground transition-colors"
        >
          &larr;
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{integration.name}</h1>
          <p className="mt-1 text-sm text-muted">
            {integration.vendor} &middot; {integration.protocol} &middot; {integration.category}
          </p>
        </div>
      </div>

      <p className="mt-6 text-muted max-w-2xl">
        {integration.description}
      </p>

      {/* Configuration Templates */}
      <div className="mt-8">
        <h2 className="text-lg font-medium">Configuration Templates</h2>
        <p className="mt-1 text-sm text-muted">
          Select a template to import into your gateway.
        </p>

        <div className="mt-4 space-y-3">
          {integration.configs.map((config) => (
            <div
              key={config.name}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:bg-card-hover"
            >
              <div>
                <p className="font-medium">{config.name}</p>
                <p className="mt-0.5 text-sm text-muted">
                  {config.tags} tags &middot; Updated {config.updated}
                </p>
              </div>
              <button className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent">
                Import
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
