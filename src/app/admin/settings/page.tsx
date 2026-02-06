"use client";

import { useState, useEffect } from "react";

interface Settings {
  sessionMaxAgeDays: number;
}

const SESSION_PRESETS = [
  { label: "1일", days: 1 },
  { label: "7일", days: 7 },
  { label: "30일", days: 30 },
  { label: "90일", days: 90 },
  { label: "365일", days: 365 },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettings(data);
      setLoading(false);
    }
    fetchSettings();
  }, []);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    setSaved(false);

    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    setSaving(false);

    if (res.ok) {
      const data = await res.json();
      setSettings(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  if (loading || !settings) {
    return <div className="text-center py-12 text-[var(--color-muted)]">로딩 중...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">사이트 설정</h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">플랫폼 전역 설정을 관리합니다.</p>
      </div>

      {/* Session Settings */}
      <div className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl space-y-5">
        <div>
          <h2 className="text-lg font-medium text-[var(--color-foreground)]">로그인 세션</h2>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            사용자 로그인 세션의 유효 기간을 설정합니다. 변경 시 새로운 로그인부터 적용됩니다.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-foreground)] mb-3">세션 유지 기간</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {SESSION_PRESETS.map((preset) => (
              <button
                key={preset.days}
                onClick={() => setSettings({ ...settings, sessionMaxAgeDays: preset.days })}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-all ${
                  settings.sessionMaxAgeDays === preset.days
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                    : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-muted)]/50 hover:text-[var(--color-foreground)]"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              max={365}
              value={settings.sessionMaxAgeDays}
              onChange={(e) => setSettings({ ...settings, sessionMaxAgeDays: parseInt(e.target.value) || 1 })}
              className="w-24 px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-center text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-accent)]"
            />
            <span className="text-sm text-[var(--color-muted)]">일</span>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] text-[var(--color-background)] font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
        >
          {saving ? "저장 중..." : "저장"}
        </button>
        {saved && (
          <span className="text-sm text-green-400 font-medium">저장되었습니다.</span>
        )}
      </div>
    </div>
  );
}
