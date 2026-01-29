"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // 2초 후 자동으로 이전 페이지 또는 홈으로 이동
    const timer = setTimeout(() => {
      // history가 있으면 뒤로 가기, 없으면 홈으로
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push("/");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  function handleGoBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <Image
          src="/nodi-logo-symbol.png"
          alt="Nodi"
          width={48}
          height={48}
          className="mx-auto"
        />
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-[var(--color-muted)] mt-2">
            잠시 후 이전 페이지로 돌아갑니다...
          </p>
        </div>
        <button
          onClick={handleGoBack}
          className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-card-hover)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-muted)]/50 transition-all text-[var(--color-foreground)] font-medium"
        >
          지금 돌아가기
        </button>
      </div>
    </div>
  );
}
