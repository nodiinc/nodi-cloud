"use client";

import { useState, useEffect, use } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface InvitationData {
  valid: boolean;
  customerName?: string;
  error?: string;
}

export default function SignupPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function validateToken() {
      const res = await fetch(`/api/invitations/${token}`);
      const data = await res.json();
      setInvitation(data);
    }
    validateToken();
  }, [token]);

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

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email, password, name }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "가입 중 오류가 발생했습니다.");
      setLoading(false);
      return;
    }

    // 가입 성공 후 로그인
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  }

  async function handleGoogleSignup() {
    setLoading(true);
    // 토큰을 세션에 저장하고 OAuth 진행
    sessionStorage.setItem("invitationToken", token);
    await signIn("google", { callbackUrl: `/api/auth/complete-signup?token=${token}` });
  }

  if (!invitation) {
    return (
      <div className="text-center">
        <p className="text-[var(--muted)]">초대 링크 확인 중...</p>
      </div>
    );
  }

  if (!invitation.valid) {
    return (
      <div className="text-center space-y-4">
        <Image
          src="/nodi-logo-symbol.png"
          alt="nodi"
          width={48}
          height={48}
          className="mx-auto"
        />
        <h1 className="text-2xl font-semibold">유효하지 않은 초대</h1>
        <p className="text-[var(--muted)]">{invitation.error || "초대 링크가 만료되었거나 유효하지 않습니다."}</p>
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
        <h1 className="text-2xl font-semibold">가입하기</h1>
        <p className="text-[var(--muted)] mt-2">
          <span className="text-[var(--foreground)]">{invitation.customerName}</span>에 초대되었습니다
        </p>
      </div>

      <button
        onClick={handleGoogleSignup}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[var(--border)] rounded-lg hover:bg-[var(--card-hover)] transition-colors disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Google로 가입
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border)]"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[var(--background)] text-[var(--muted)]">또는</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            이름
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
            placeholder="홍길동"
          />
        </div>

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

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            비밀번호
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
          {loading ? "가입 중..." : "가입하기"}
        </button>
      </form>
    </div>
  );
}
