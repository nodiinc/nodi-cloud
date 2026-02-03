"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/password-reset/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "비밀번호 재설정 중 오류가 발생했습니다.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <Image
          src="/nodi-logo-symbol.png"
          alt="nodi"
          width={48}
          height={48}
          className="mx-auto"
        />
        <h1 className="text-2xl font-semibold">비밀번호가 변경되었습니다</h1>
        <p className="text-[var(--muted)]">새 비밀번호로 로그인하세요.</p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90 transition-colors"
        >
          로그인하기
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Image
          src="/nodi-logo-symbol.png"
          alt="nodi"
          width={48}
          height={48}
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold">새 비밀번호 설정</h1>
        <p className="text-[var(--muted)] mt-2">새로운 비밀번호를 입력하세요</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            새 비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
            placeholder="8자 이상"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
            비밀번호 확인
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
            placeholder="비밀번호 재입력"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90 transition-colors disabled:opacity-50"
        >
          {loading ? "변경 중..." : "비밀번호 변경"}
        </button>
      </form>
    </div>
  );
}
