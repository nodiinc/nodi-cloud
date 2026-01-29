"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
      <div className="text-center space-y-4">
        <Image
          src="/nodi-logo-symbol.png"
          alt="nodi"
          width={48}
          height={48}
          className="mx-auto"
        />
        <h1 className="text-2xl font-semibold">이메일을 확인하세요</h1>
        <p className="text-[var(--muted)]">
          입력하신 이메일로 비밀번호 재설정 링크를 보냈습니다.
        </p>
        <Link href="/login" className="text-[var(--accent)] hover:underline">
          로그인으로 돌아가기
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
        <h1 className="text-2xl font-semibold">비밀번호 재설정</h1>
        <p className="text-[var(--muted)] mt-2">가입한 이메일을 입력하세요</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
            placeholder="name@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90 transition-colors disabled:opacity-50"
        >
          {loading ? "전송 중..." : "재설정 링크 보내기"}
        </button>

        <div className="text-center">
          <Link href="/login" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
            로그인으로 돌아가기
          </Link>
        </div>
      </form>
    </div>
  );
}
