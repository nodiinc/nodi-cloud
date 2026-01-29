import Link from "next/link";

// Mock data - will be replaced with API calls
const MOCK_TAGS = [
  { id: "temperature/sensor_01", value: 24.5, quality: "good", unit: "°C" },
  { id: "temperature/sensor_02", value: 26.1, quality: "good", unit: "°C" },
  { id: "humidity/sensor_01", value: 45.2, quality: "good", unit: "%" },
  { id: "pressure/line_1", value: 2.4, quality: "good", unit: "bar" },
  { id: "vibration/motor_01", value: 0.12, quality: "good", unit: "mm/s" },
  { id: "current/drive_01", value: 12.8, quality: "good", unit: "A" },
  { id: "speed/conveyor_01", value: 1.5, quality: "good", unit: "m/s" },
  { id: "count/production", value: 4521, quality: "good", unit: "pcs" },
];

export default async function GatewayDetailPage({
  params,
}: {
  params: Promise<{ serial: string }>;
}) {
  const { serial } = await params;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/gateways"
          className="text-muted hover:text-foreground transition-colors"
        >
          &larr;
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight font-mono">
            {serial}
          </h1>
          <p className="mt-1 text-sm text-muted">Factory A - Line 1</p>
        </div>
        <span className="ml-4 flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-status-online" />
          <span className="text-sm text-status-online">Online</span>
        </span>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <Link
          href={`/gateways/${serial}/config`}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          Remote Config
        </Link>
      </div>

      {/* Live Tags */}
      <div className="mt-8">
        <h2 className="text-lg font-medium">Live Tags</h2>
        <p className="mt-1 text-sm text-muted">Real-time data from connected devices</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_TAGS.map((tag) => (
            <div
              key={tag.id}
              className="rounded-xl border border-border bg-card p-4 transition-colors hover:bg-card-hover"
            >
              <p className="truncate font-mono text-xs text-muted">{tag.id}</p>
              <p className="mt-2 text-2xl font-semibold tabular-nums">
                {tag.value}
                <span className="ml-1 text-sm font-normal text-muted">{tag.unit}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="mt-8">
        <h2 className="text-lg font-medium">Time Series</h2>
        <p className="mt-1 text-sm text-muted">Historical data visualization</p>
        <div className="mt-4 flex h-64 items-center justify-center rounded-xl border border-border bg-card">
          <p className="text-sm text-muted">Chart will be rendered here</p>
        </div>
      </div>
    </div>
  );
}
