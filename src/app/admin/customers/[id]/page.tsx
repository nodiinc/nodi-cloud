"use client";

import { useState, useEffect, useReducer, use } from "react";
import Link from "next/link";

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  SUPER_ADMIN: { label: "최고관리자", color: "bg-red-500/20 text-red-400" },
  CUSTOMER_ADMIN: { label: "고객관리자", color: "bg-orange-500/20 text-orange-400" },
  OPERATOR: { label: "운영자", color: "bg-blue-500/20 text-blue-400" },
  VIEWER: { label: "뷰어", color: "bg-gray-500/20 text-gray-400" },
};

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
  const [copied, setCopied] = useState(false);
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
    setCopied(false);
    refresh();
  }

  async function copyInviteUrl() {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return <div className="text-center py-12 text-[var(--color-muted)]">로딩 중...</div>;
  }

  if (!customer) {
    return <div className="text-center py-12 text-[var(--color-muted)]">고객을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="space-y-8">
      <Link href="/admin/customers" className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        목록으로
      </Link>

      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">{customer.name}</h1>
        <p className="text-[var(--color-muted)] font-mono text-sm mt-1">{customer.code}</p>
        {customer.description && <p className="mt-2 text-[var(--color-muted)]">{customer.description}</p>}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-5 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl">
          <p className="text-2xl font-bold text-[var(--color-foreground)]">{customer.users.length}</p>
          <p className="text-sm text-[var(--color-muted)] mt-1">사용자</p>
        </div>
        <div className="p-5 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl">
          <p className="text-2xl font-bold text-[var(--color-foreground)]">{customer.gateways.length}</p>
          <p className="text-sm text-[var(--color-muted)] mt-1">게이트웨이</p>
        </div>
        <div className="p-5 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl">
          <p className="text-2xl font-bold text-[var(--color-foreground)]">{customer.invitations.length}</p>
          <p className="text-sm text-[var(--color-muted)] mt-1">초대</p>
        </div>
      </div>

      {/* Invite Section */}
      <div className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl space-y-4">
        <h2 className="text-lg font-medium text-[var(--color-foreground)]">초대 링크</h2>
        <button
          onClick={createInvitation}
          className="px-4 py-2.5 bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] text-[var(--color-background)] font-medium rounded-lg hover:opacity-90 transition-opacity text-sm"
        >
          새 초대 링크 생성
        </button>
        {inviteUrl && (
          <div className="flex gap-3 items-center">
            <input
              type="text" value={inviteUrl} readOnly
              className="flex-1 px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg font-mono text-sm text-[var(--color-foreground)]"
            />
            <button onClick={copyInviteUrl}
              className="px-4 py-3 border border-[var(--color-border)] text-[var(--color-foreground)] rounded-lg hover:bg-[var(--color-card-hover)] transition-colors text-sm">
              {copied ? "복사됨!" : "복사"}
            </button>
          </div>
        )}
      </div>

      {/* Users */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-[var(--color-foreground)]">사용자 ({customer.users.length})</h2>
        {customer.users.length === 0 ? (
          <p className="text-[var(--color-muted)] text-sm">연결된 사용자가 없습니다.</p>
        ) : (
          <div className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-[var(--color-card)]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">이름</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">이메일</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">역할</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {customer.users.map((user) => (
                  <tr key={user.id} className="hover:bg-[var(--color-card-hover)] transition-colors">
                    <td className="px-6 py-4 font-medium text-[var(--color-foreground)]">{user.name || "-"}</td>
                    <td className="px-6 py-4 font-mono text-sm text-[var(--color-muted)]">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${ROLE_LABELS[user.role]?.color || "bg-gray-500/20 text-gray-400"}`}>
                        {ROLE_LABELS[user.role]?.label || user.role}
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
        <h2 className="text-lg font-medium text-[var(--color-foreground)]">게이트웨이 ({customer.gateways.length})</h2>
        {customer.gateways.length === 0 ? (
          <p className="text-[var(--color-muted)] text-sm">연결된 게이트웨이가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {customer.gateways.map((gw) => (
              <div key={gw.id} className="p-4 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-accent)]/30 transition-colors">
                <span className="font-mono text-sm text-[var(--color-foreground)]">{gw.serial}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
