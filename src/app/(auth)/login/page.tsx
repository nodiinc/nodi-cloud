"use client";

import { Suspense, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError) {
      if (urlError === "CredentialsSignin") {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else if (urlError === "AccessDenied") {
        setError("접근이 거부되었습니다. 초대된 사용자만 로그인할 수 있습니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  }, [searchParams]);

  async function handleCredentialsLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setLoading(false);
    } else {
      window.location.href = "/dashboard";
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Image
          src={siteConfig.logo.symbol}
          alt={siteConfig.name}
          width={48}
          height={48}
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">로그인</h1>
        <p className="text-[var(--color-muted)] mt-2">{siteConfig.name} Cloud에 오신 것을 환영합니다</p>
      </div>

      <form onSubmit={handleCredentialsLogin} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
            {error}
          </div>
        )}

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

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2 text-[var(--color-foreground)]">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-foreground)]"
            placeholder="••••••••"
          />
        </div>

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-[var(--color-accent)] hover:underline">
            비밀번호를 잊으셨나요?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-[var(--color-accent)] text-black font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <div className="flex items-center gap-4">
        <div className="flex-1 border-t border-[var(--color-border)]"></div>
        <span className="text-sm text-[var(--color-muted)]">또는</span>
        <div className="flex-1 border-t border-[var(--color-border)]"></div>
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[var(--color-card-hover)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-muted)]/50 transition-all disabled:opacity-50 text-[var(--color-foreground)]"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Google로 로그인
      </button>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center text-[var(--color-muted)]">로딩 중...</div>}>
      <LoginForm />
    </Suspense>
  );
}
