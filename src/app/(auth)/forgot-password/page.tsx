"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/password-reset/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="text-center space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">이메일을 확인하세요</h1>
          <p className="text-[var(--color-muted)] mt-2">
            입력하신 이메일로 비밀번호 재설정 링크를 보냈습니다.
          </p>
        </div>
        <Link
          href="/login"
          className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-card-hover)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-muted)]/50 transition-all text-[var(--color-foreground)] font-medium"
        >
          로그인으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">비밀번호 재설정</h1>
        <p className="text-[var(--color-muted)] mt-2">가입한 이메일을 입력하세요</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-[var(--color-foreground)]">
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-foreground)]"
            placeholder="name@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-[var(--color-accent)] text-black font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "전송 중..." : "재설정 링크 보내기"}
        </button>

        <Link
          href="/login"
          className="w-full flex items-center justify-center px-4 py-3 bg-[var(--color-card-hover)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-muted)]/50 transition-all text-[var(--color-foreground)] font-medium"
        >
          로그인으로 돌아가기
        </Link>
      </form>
    </div>
  );
}
