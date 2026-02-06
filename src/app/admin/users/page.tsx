"use client";

import { useState, useEffect, useReducer } from "react";

interface Customer {
  id: string;
  code: string;
  name: string;
}

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  customerId: string | null;
  customer: Customer | null;
  createdAt: string;
}

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  SUPER_ADMIN: { label: "최고관리자", color: "bg-red-500/20 text-red-400" },
  CUSTOMER_ADMIN: { label: "고객관리자", color: "bg-orange-500/20 text-orange-400" },
  OPERATOR: { label: "운영자", color: "bg-blue-500/20 text-blue-400" },
  VIEWER: { label: "뷰어", color: "bg-gray-500/20 text-gray-400" },
};

const ROLES = ["SUPER_ADMIN", "CUSTOMER_ADMIN", "OPERATOR", "VIEWER"];

const inputClass = "w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-accent)]";
const labelClass = "block text-sm font-medium text-[var(--color-foreground)] mb-2";
const secondaryBtnClass = "px-4 py-2.5 border border-[var(--color-border)] text-[var(--color-foreground)] rounded-lg hover:bg-[var(--color-card-hover)] transition-colors text-sm";
const primaryBtnClass = "px-4 py-2.5 bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] text-[var(--color-background)] font-medium rounded-lg hover:opacity-90 transition-opacity text-sm disabled:opacity-50";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshKey, refresh] = useReducer((x: number) => x + 1, 0);

  const [editUser, setEditUser] = useState<User | null>(null);
  const [editRole, setEditRole] = useState("");
  const [editCustomerId, setEditCustomerId] = useState("");
  const [saving, setSaving] = useState(false);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteCustomerId, setInviteCustomerId] = useState("");
  const [inviteRole, setInviteRole] = useState("OPERATOR");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteSendEmail, setInviteSendEmail] = useState(false);
  const [inviteUrl, setInviteUrl] = useState("");
  const [inviting, setInviting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      const [usersRes, customersRes] = await Promise.all([
        fetch(`/api/users?search=${encodeURIComponent(search)}`),
        fetch("/api/customers"),
      ]);
      const [usersData, customersData] = await Promise.all([usersRes.json(), customersRes.json()]);
      if (!cancelled) {
        setUsers(usersData);
        setCustomers(customersData);
        setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [search, refreshKey]);

  function openEditModal(user: User) {
    setEditUser(user);
    setEditRole(user.role);
    setEditCustomerId(user.customerId || "");
  }

  function closeEditModal() {
    setEditUser(null);
  }

  async function handleSave() {
    if (!editUser) return;
    setSaving(true);
    const res = await fetch(`/api/users/${editUser.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: editRole, customerId: editCustomerId || null }),
    });
    setSaving(false);
    if (res.ok) { closeEditModal(); refresh(); }
    else { const data = await res.json(); alert(data.error || "저장 실패"); }
  }

  async function handleDelete() {
    if (!editUser || !confirm(`${editUser.name || editUser.email} 사용자를 삭제하시겠습니까?`)) return;
    setSaving(true);
    const res = await fetch(`/api/users/${editUser.id}`, { method: "DELETE" });
    setSaving(false);
    if (res.ok) { closeEditModal(); refresh(); }
    else { const data = await res.json(); alert(data.error || "삭제 실패"); }
  }

  function openInviteModal() {
    setShowInviteModal(true);
    setInviteCustomerId(customers[0]?.id || "");
    setInviteRole("OPERATOR");
    setInviteEmail("");
    setInviteSendEmail(false);
    setInviteUrl("");
    setCopied(false);
  }

  function closeInviteModal() {
    setShowInviteModal(false);
    setInviteUrl("");
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteCustomerId) return;
    setInviting(true);
    const res = await fetch("/api/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: inviteCustomerId, role: inviteRole, email: inviteEmail || undefined, sendEmail: inviteSendEmail }),
    });
    setInviting(false);
    if (res.ok) { const data = await res.json(); setInviteUrl(data.inviteUrl); }
  }

  async function copyInviteUrl() {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">사용자 관리</h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">사용자 계정을 관리하고 초대합니다.</p>
        </div>
        <button onClick={openInviteModal} className={primaryBtnClass}>+ 초대 생성</button>
      </div>

      <input
        type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="이름, 이메일로 검색..."
        className="w-full px-4 py-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]/50"
      />

      <div className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-[var(--color-card)]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">이름</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">이메일</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">역할</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">소속 고객</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">가입일</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-[var(--color-muted)]">로딩 중...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-[var(--color-muted)]">사용자가 없습니다.</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-[var(--color-card-hover)] cursor-pointer transition-colors" onClick={() => openEditModal(user)}>
                  <td className="px-6 py-4 font-medium text-[var(--color-foreground)]">{user.name || "-"}</td>
                  <td className="px-6 py-4 font-mono text-sm text-[var(--color-muted)]">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${ROLE_LABELS[user.role]?.color || "bg-gray-500/20 text-gray-400"}`}>
                      {ROLE_LABELS[user.role]?.label || user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--color-muted)]">{user.customer ? user.customer.name : "-"}</td>
                  <td className="px-6 py-4 text-sm text-[var(--color-muted)]">{formatDate(user.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h2 className="text-xl font-semibold text-[var(--color-foreground)] mb-1">{editUser.name || "이름 없음"}</h2>
            <p className="text-sm text-[var(--color-muted)] font-mono mb-6">{editUser.email}</p>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>역할</label>
                <select value={editRole} onChange={(e) => setEditRole(e.target.value)} className={inputClass}>
                  {ROLES.map((role) => (<option key={role} value={role}>{ROLE_LABELS[role]?.label || role}</option>))}
                </select>
              </div>
              <div>
                <label className={labelClass}>소속 고객</label>
                <select value={editCustomerId} onChange={(e) => setEditCustomerId(e.target.value)} className={inputClass}>
                  <option value="">없음</option>
                  {customers.map((c) => (<option key={c.id} value={c.id}>{c.name} ({c.code})</option>))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 justify-between mt-6">
              <button onClick={handleDelete} disabled={saving}
                className="px-4 py-2.5 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors text-sm disabled:opacity-50">삭제</button>
              <div className="flex gap-3">
                <button onClick={closeEditModal} className={secondaryBtnClass}>취소</button>
                <button onClick={handleSave} disabled={saving} className={primaryBtnClass}>
                  {saving ? "저장 중..." : "저장"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h2 className="text-xl font-semibold text-[var(--color-foreground)] mb-6">초대 생성</h2>

            {inviteUrl ? (
              <div className="space-y-4">
                <div className="p-4 bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/20 rounded-lg">
                  <p className="text-sm text-[var(--color-accent)] font-medium mb-1">초대 링크가 생성되었습니다.</p>
                  <p className="text-xs text-[var(--color-muted)]">아래 링크를 대상자에게 전달하세요.</p>
                </div>
                <div className="flex gap-3 items-center">
                  <input type="text" value={inviteUrl} readOnly
                    className="flex-1 px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg font-mono text-xs text-[var(--color-foreground)]" />
                  <button onClick={copyInviteUrl} className={secondaryBtnClass}>
                    {copied ? "복사됨!" : "복사"}
                  </button>
                </div>
                <div className="flex justify-end">
                  <button onClick={closeInviteModal} className={secondaryBtnClass}>닫기</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label className={labelClass}>고객</label>
                  <select value={inviteCustomerId} onChange={(e) => setInviteCustomerId(e.target.value)} required className={inputClass}>
                    {customers.map((c) => (<option key={c.id} value={c.id}>{c.name} ({c.code})</option>))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>역할</label>
                  <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} className={inputClass}>
                    {ROLES.map((role) => (<option key={role} value={role}>{ROLE_LABELS[role]?.label || role}</option>))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>이메일 (선택)</label>
                  <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="user@example.com"
                    className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-accent)]" />
                </div>
                {inviteEmail && (
                  <label className="flex items-center gap-2.5 text-sm text-[var(--color-foreground)] cursor-pointer">
                    <input type="checkbox" checked={inviteSendEmail} onChange={(e) => setInviteSendEmail(e.target.checked)}
                      className="w-4 h-4 rounded border-[var(--color-border)] accent-[var(--color-accent)]" />
                    초대 이메일 발송
                  </label>
                )}
                <div className="flex gap-3 justify-end pt-2">
                  <button type="button" onClick={closeInviteModal} className={secondaryBtnClass}>취소</button>
                  <button type="submit" disabled={inviting || !inviteCustomerId} className={primaryBtnClass}>
                    {inviting ? "생성 중..." : "생성"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
