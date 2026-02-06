import Link from "next/link";
import Image from "next/image";
import { auth, Role } from "@/lib/auth";

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

export default async function GatewaysPage() {
  const session = await auth();
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

      {/* Session Info (Temporary Debug Section) */}
      {session && (
        <div className="mt-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            세션 정보 (임시 디버그)
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Basic User Info */}
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4">
              <h3 className="text-sm font-medium text-[var(--color-muted)] mb-3">사용자 기본 정보</h3>
              <div className="flex items-center gap-4 mb-4">
                {session.googleProfile?.picture ? (
                  <Image
                    src={session.googleProfile.picture}
                    alt="Profile"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center">
                    <span className="text-lg font-semibold text-[var(--color-accent)]">
                      {session.user?.name?.[0] || session.user?.email?.[0] || "?"}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-medium text-[var(--color-foreground)]">{session.user?.name || "이름 없음"}</p>
                  <p className="text-sm text-[var(--color-muted)]">{session.user?.email}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-muted)]">ID</span>
                  <span className="font-mono text-[var(--color-foreground)]">{session.user?.id || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-muted)]">Role</span>
                  <span className={`font-medium ${session.user?.role === Role.SUPER_ADMIN ? "text-[var(--color-accent)]" : "text-[var(--color-foreground)]"}`}>
                    {session.user?.role || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-muted)]">Provider</span>
                  <span className="font-medium text-[var(--color-foreground)]">
                    {session.provider === "google" ? (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                      </span>
                    ) : (
                      "Credentials"
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Google Profile (if available) */}
            {session.googleProfile && (
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4">
                <h3 className="text-sm font-medium text-[var(--color-muted)] mb-3">Google OAuth 정보</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-muted)]">Name</span>
                    <span className="text-[var(--color-foreground)]">{session.googleProfile.name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-muted)]">Email</span>
                    <span className="text-[var(--color-foreground)]">{session.googleProfile.email || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-muted)]">Locale</span>
                    <span className="text-[var(--color-foreground)]">{session.googleProfile.locale || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-muted)]">Picture URL</span>
                    <span className="text-[var(--color-foreground)] truncate max-w-[200px]" title={session.googleProfile.picture}>
                      {session.googleProfile.picture ? "있음" : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Raw Session JSON */}
            <div className="md:col-span-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4">
              <h3 className="text-sm font-medium text-[var(--color-muted)] mb-3">Raw Session Data (JSON)</h3>
              <pre className="text-xs overflow-x-auto p-3 rounded bg-black/50 text-green-400">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
