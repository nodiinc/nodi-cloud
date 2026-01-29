import Link from "next/link";

interface Gateway {
  serial: string;
  alias: string;
  status: "online" | "offline";
  lastSeen: string;
  firmwareVer: string;
  tagCount: number;
}

// Mock data - will be replaced with API calls
const MOCK_GATEWAYS: Gateway[] = [
  { serial: "NE-EBOW4", alias: "Factory A - Line 1", status: "online", lastSeen: "2026-01-23 10:30:00", firmwareVer: "1.2.0", tagCount: 128 },
  { serial: "NE-FKX92", alias: "Factory A - Line 2", status: "online", lastSeen: "2026-01-23 10:29:55", firmwareVer: "1.2.0", tagCount: 96 },
  { serial: "NE-QMP71", alias: "Factory B - Main", status: "offline", lastSeen: "2026-01-22 18:45:12", firmwareVer: "1.1.3", tagCount: 256 },
  { serial: "NE-TRZ38", alias: "Warehouse - Env Monitor", status: "online", lastSeen: "2026-01-23 10:30:01", firmwareVer: "1.2.1", tagCount: 32 },
  { serial: "NE-VPN15", alias: "Factory C - Assembly", status: "offline", lastSeen: "2026-01-20 09:12:33", firmwareVer: "1.0.8", tagCount: 64 },
];

function StatusBadge({ status }: { status: "online" | "offline" }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className={`inline-block h-2 w-2 rounded-full ${
          status === "online" ? "bg-status-online" : "bg-status-offline"
        }`}
      />
      <span className={`text-sm ${status === "online" ? "text-status-online" : "text-status-offline"}`}>
        {status === "online" ? "Online" : "Offline"}
      </span>
    </span>
  );
}

export default function GatewaysPage() {
  const onlineCount = MOCK_GATEWAYS.filter((g) => g.status === "online").length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Gateways</h1>
          <p className="mt-1 text-sm text-muted">
            {MOCK_GATEWAYS.length} gateways &middot; {onlineCount} online
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="px-4 py-3 font-medium text-muted">Serial</th>
              <th className="px-4 py-3 font-medium text-muted">Alias</th>
              <th className="px-4 py-3 font-medium text-muted">Status</th>
              <th className="px-4 py-3 font-medium text-muted">Tags</th>
              <th className="px-4 py-3 font-medium text-muted">Firmware</th>
              <th className="px-4 py-3 font-medium text-muted">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_GATEWAYS.map((gateway) => (
              <tr
                key={gateway.serial}
                className="border-b border-border transition-colors last:border-0 hover:bg-card-hover"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/gateways/${gateway.serial}`}
                    className="font-mono text-sm font-medium text-accent hover:underline"
                  >
                    {gateway.serial}
                  </Link>
                </td>
                <td className="px-4 py-3 text-foreground">{gateway.alias}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={gateway.status} />
                </td>
                <td className="px-4 py-3 font-mono text-muted">{gateway.tagCount}</td>
                <td className="px-4 py-3 font-mono text-muted">{gateway.firmwareVer}</td>
                <td className="px-4 py-3 text-muted">{gateway.lastSeen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
