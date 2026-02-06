"use client";

import { useState, useEffect, useReducer } from "react";
import Link from "next/link";

interface Customer {
  id: string;
  code: string;
  name: string;
  description: string | null;
  createdAt: string;
  _count: { users: number; gateways: number };
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ code: "", name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [refreshKey, refresh] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      const res = await fetch(`/api/customers?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (!cancelled) {
        setCustomers(data);
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [search, refreshKey]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    });

    if (res.ok) {
      setShowCreateModal(false);
      setNewCustomer({ code: "", name: "", description: "" });
      refresh();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">고객 관리</h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">등록된 고객사를 관리합니다.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] text-[var(--color-background)] font-medium rounded-lg hover:opacity-90 transition-opacity text-sm"
        >
          + 고객 추가
        </button>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="코드, 이름, 설명으로 검색..."
        className="w-full px-4 py-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]/50"
      />

      <div className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-[var(--color-card)]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">코드</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">이름</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">설명</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">사용자</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">게이트웨이</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-[var(--color-muted)]">로딩 중...</td></tr>
            ) : customers.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-[var(--color-muted)]">고객이 없습니다.</td></tr>
            ) : (
              customers.map((c) => (
                <tr key={c.id} className="hover:bg-[var(--color-card-hover)] transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/admin/customers/${c.id}`} className="font-mono text-sm text-[var(--color-accent)] hover:underline">{c.code}</Link>
                  </td>
                  <td className="px-6 py-4 font-medium text-[var(--color-foreground)]">{c.name}</td>
                  <td className="px-6 py-4 text-sm text-[var(--color-muted)]">{c.description || "-"}</td>
                  <td className="px-6 py-4"><span className="inline-flex px-2 py-0.5 rounded-md text-xs font-medium bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)]">{c._count.users}</span></td>
                  <td className="px-6 py-4"><span className="inline-flex px-2 py-0.5 rounded-md text-xs font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)]">{c._count.gateways}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h2 className="text-xl font-semibold text-[var(--color-foreground)] mb-6">고객 추가</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">고객 코드</label>
                <input type="text" value={newCustomer.code} onChange={(e) => setNewCustomer({ ...newCustomer, code: e.target.value })} required
                  className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-accent)]"
                  placeholder="ACME-001" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">고객 이름</label>
                <input type="text" value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} required
                  className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-accent)]"
                  placeholder="ACME 제조" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">설명 (선택)</label>
                <textarea value={newCustomer.description} onChange={(e) => setNewCustomer({ ...newCustomer, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-accent)]"
                  placeholder="관리자 메모" rows={3} />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 border border-[var(--color-border)] text-[var(--color-foreground)] rounded-lg hover:bg-[var(--color-card-hover)] transition-colors text-sm">취소</button>
                <button type="submit"
                  className="px-4 py-2.5 bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] text-[var(--color-background)] font-medium rounded-lg hover:opacity-90 transition-opacity text-sm">추가</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
