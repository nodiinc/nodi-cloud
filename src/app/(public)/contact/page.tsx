"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "문의 접수에 실패했습니다");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "오류가 발생했습니다");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-blue)]/20 to-[var(--color-brand-cyan)]/20">
            <svg className="h-8 w-8 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-[var(--color-foreground)] mb-3">
            문의가 접수되었습니다
          </h1>
          <p className="text-[var(--color-muted)] mb-8">
            빠른 시일 내에 답변 드리겠습니다.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] px-6 py-3 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-6">
      <div className="mx-auto max-w-lg">
        <div className="text-center mb-10">
          <p className="mb-4 text-base font-medium uppercase tracking-widest text-[var(--color-accent)]">
            Contact
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-foreground)] md:text-4xl">
            문의하기
          </h1>
          <p className="mt-4 text-[var(--color-muted)]">
            궁금한 점이 있으시면 언제든 문의해 주세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
              이름
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
              placeholder="홍길동"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
              이메일
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
              placeholder="example@company.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
              문의 내용
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors resize-none"
              placeholder="문의하실 내용을 입력해 주세요"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-xl bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-cyan)] px-6 py-3.5 text-sm font-semibold text-[var(--color-background)] transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "접수 중..." : "문의 접수"}
          </button>
        </form>
      </div>
    </div>
  );
}
