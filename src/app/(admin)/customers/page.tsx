"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    fetchCustomers();
  }, [search]);

  async function fetchCustomers() {
    setLoading(true);
    const res = await fetch(`/api/customers?search=${encodeURIComponent(search)}`);
    const data = await res.json();
    setCustomers(data);
    setLoading(false);
  }

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
      fetchCustomers();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">고객 관리</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90 transition-colors"
        >
          고객 추가
        </button>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="코드, 이름, 설명으로 검색..."
          className="flex-1 px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
        />
      </div>

      <div className="border border-[var(--border)] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[var(--card)]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">코드</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">이름</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">설명</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">사용자</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">게이트웨이</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-[var(--muted)]">
                  로딩 중...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-[var(--muted)]">
                  고객이 없습니다.
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-[var(--card-hover)]">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/customers/${customer.id}`}
                      className="font-mono text-[var(--accent)] hover:underline"
                    >
                      {customer.code}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{customer.name}</td>
                  <td className="px-6 py-4 text-[var(--muted)]">{customer.description || "-"}</td>
                  <td className="px-6 py-4">{customer._count.users}</td>
                  <td className="px-6 py-4">{customer._count.gateways}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--card)] rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">고객 추가</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">고객 코드</label>
                <input
                  type="text"
                  value={newCustomer.code}
                  onChange={(e) => setNewCustomer({ ...newCustomer, code: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg"
                  placeholder="ACME-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">고객 이름</label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg"
                  placeholder="ACME 제조"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">설명 (선택)</label>
                <textarea
                  value={newCustomer.description}
                  onChange={(e) => setNewCustomer({ ...newCustomer, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg"
                  placeholder="관리자 메모"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--card-hover)]"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90"
                >
                  추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
