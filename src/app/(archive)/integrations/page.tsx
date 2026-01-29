import Link from "next/link";

interface Integration {
  id: string;
  name: string;
  vendor: string;
  protocol: string;
  category: "sensor" | "plc" | "meter" | "drive";
  configCount: number;
}

// Mock data - will be replaced with database
const MOCK_INTEGRATIONS: Integration[] = [
  { id: "siemens-s7-1200", name: "S7-1200", vendor: "Siemens", protocol: "OPC UA", category: "plc", configCount: 12 },
  { id: "mitsubishi-fx5u", name: "FX5U", vendor: "Mitsubishi", protocol: "Modbus TCP", category: "plc", configCount: 8 },
  { id: "abb-acs880", name: "ACS880", vendor: "ABB", protocol: "Modbus RTU", category: "drive", configCount: 5 },
  { id: "endress-promag", name: "Promag 400", vendor: "Endress+Hauser", protocol: "Modbus RTU", category: "meter", configCount: 3 },
  { id: "keyence-gt2", name: "GT2 Series", vendor: "Keyence", protocol: "Modbus TCP", category: "sensor", configCount: 6 },
  { id: "omron-nx1", name: "NX1", vendor: "Omron", protocol: "OPC UA", category: "plc", configCount: 4 },
  { id: "schneider-m340", name: "Modicon M340", vendor: "Schneider", protocol: "Modbus TCP", category: "plc", configCount: 7 },
  { id: "yokogawa-eja", name: "EJA Series", vendor: "Yokogawa", protocol: "Fieldbus", category: "sensor", configCount: 2 },
];

const CATEGORY_LABELS: Record<string, string> = {
  sensor: "Sensor",
  plc: "PLC",
  meter: "Meter",
  drive: "Drive",
};

export default function IntegrationsPage() {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Integration Archive</h1>
        <p className="mt-2 text-muted">
          Pre-configured device templates. Import directly to your gateway.
        </p>
      </div>

      {/* Filter chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        {["All", "PLC", "Sensor", "Meter", "Drive"].map((filter) => (
          <button
            key={filter}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === "All"
                ? "bg-accent text-background"
                : "border border-border text-muted hover:border-foreground hover:text-foreground"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_INTEGRATIONS.map((item) => (
          <Link
            key={item.id}
            href={`/integrations/${item.id}`}
            className="group rounded-xl border border-border bg-card p-5 transition-colors hover:bg-card-hover"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium group-hover:text-accent transition-colors">
                  {item.name}
                </h3>
                <p className="mt-0.5 text-sm text-muted">{item.vendor}</p>
              </div>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
                {CATEGORY_LABELS[item.category]}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted">
              <span className="font-mono">{item.protocol}</span>
              <span>&middot;</span>
              <span>{item.configCount} configs</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
