"use client";

import { useState, useEffect, useReducer, use } from "react";
import Link from "next/link";

interface Customer {
  id: string;
  code: string;
  name: string;
  description: string | null;
  users: { id: string; name: string | null; email: string; role: string }[];
  gateways: { id: string; serial: string }[];
  invitations: { id: string; token: string; expiresAt: string; acceptedAt: string | null }[];
}

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [inviteUrl, setInviteUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshKey, refresh] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      const res = await fetch(`/api/customers/${id}`);
      const data = await res.json();
      if (!cancelled) {
        setCustomer(data);
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [id, refreshKey]);

  async function createInvitation() {
    const res = await fetch("/api/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: id }),
    });
    const data = await res.json();
    setInviteUrl(data.inviteUrl);
    refresh();
  }

  async function copyInviteUrl() {
    await navigator.clipboard.writeText(inviteUrl);
  }

  if (loading) {
    return <div className="text-center py-8 text-[var(--muted)]">로딩 중...</div>;
  }

  if (!customer) {
    return <div className="text-center py-8 text-[var(--muted)]">고객을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/customers" className="text-[var(--muted)] hover:text-[var(--foreground)]">
          ← 목록으로
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{customer.name}</h1>
          <p className="text-[var(--muted)] font-mono">{customer.code}</p>
          {customer.description && <p className="mt-2 text-[var(--muted)]">{customer.description}</p>}
        </div>
      </div>

      {/* Invite Section */}
      <div className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-xl space-y-4">
        <h2 className="text-lg font-medium">초대 링크</h2>
        <div className="flex gap-3">
          <button
            onClick={createInvitation}
            className="px-4 py-2 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90"
          >
            새 초대 링크 생성
          </button>
        </div>
        {inviteUrl && (
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={inviteUrl}
              readOnly
              className="flex-1 px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg font-mono text-sm"
            />
            <button
              onClick={copyInviteUrl}
              className="px-4 py-3 border border-[var(--border)] rounded-lg hover:bg-[var(--card-hover)]"
            >
              복사
            </button>
          </div>
        )}
      </div>

      {/* Users */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">사용자 ({customer.users.length})</h2>
        {customer.users.length === 0 ? (
          <p className="text-[var(--muted)]">연결된 사용자가 없습니다.</p>
        ) : (
          <div className="border border-[var(--border)] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[var(--card)]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">이름</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">이메일</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">역할</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {customer.users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4">{user.name || "-"}</td>
                    <td className="px-6 py-4 font-mono text-sm">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${user.role === "ADMIN" ? "bg-[var(--accent)]/20 text-[var(--accent)]" : "bg-[var(--muted)]/20"}`}>
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Gateways */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">게이트웨이 ({customer.gateways.length})</h2>
        {customer.gateways.length === 0 ? (
          <p className="text-[var(--muted)]">연결된 게이트웨이가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {customer.gateways.map((gw) => (
              <div key={gw.id} className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg">
                <span className="font-mono">{gw.serial}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
