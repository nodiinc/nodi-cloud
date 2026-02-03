"use client";

import { useState, useEffect, useReducer } from "react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "PENDING" | "READ" | "REPLIED";
  createdAt: string;
}

const STATUS_LABELS: Record<Inquiry["status"], { label: string; color: string }> = {
  PENDING: { label: "대기", color: "bg-yellow-500/20 text-yellow-400" },
  READ: { label: "확인", color: "bg-blue-500/20 text-blue-400" },
  REPLIED: { label: "답변완료", color: "bg-green-500/20 text-green-400" },
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [refreshKey, refresh] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      if (!cancelled) {
        setInquiries(data);
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  async function updateStatus(id: string, status: Inquiry["status"]) {
    await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    refresh();
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status });
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">문의 관리</h1>
        <span className="text-sm text-[var(--muted)]">
          총 {inquiries.length}건
        </span>
      </div>

      <div className="border border-[var(--border)] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[var(--card)]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">상태</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">이름</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">이메일</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">내용</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-[var(--muted)]">접수일</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-[var(--muted)]">
                  로딩 중...
                </td>
              </tr>
            ) : inquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-[var(--muted)]">
                  문의가 없습니다.
                </td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  className="hover:bg-[var(--card-hover)] cursor-pointer"
                  onClick={() => {
                    setSelectedInquiry(inquiry);
                    if (inquiry.status === "PENDING") {
                      updateStatus(inquiry.id, "READ");
                    }
                  }}
                >
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_LABELS[inquiry.status].color}`}>
                      {STATUS_LABELS[inquiry.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{inquiry.name}</td>
                  <td className="px-6 py-4 text-[var(--muted)]">{inquiry.email}</td>
                  <td className="px-6 py-4 text-[var(--muted)] max-w-xs truncate">
                    {inquiry.message}
                  </td>
                  <td className="px-6 py-4 text-[var(--muted)] text-sm">
                    {formatDate(inquiry.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedInquiry(null)}>
          <div className="bg-[var(--card)] rounded-xl p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">{selectedInquiry.name}</h2>
                <a href={`mailto:${selectedInquiry.email}`} className="text-sm text-[var(--accent)] hover:underline">
                  {selectedInquiry.email}
                </a>
              </div>
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_LABELS[selectedInquiry.status].color}`}>
                {STATUS_LABELS[selectedInquiry.status].label}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-sm text-[var(--muted)] mb-2">문의 내용</p>
              <div className="p-4 bg-[var(--background)] rounded-lg text-sm leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-[var(--muted)]">
                접수일: {formatDate(selectedInquiry.createdAt)}
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--card-hover)]"
              >
                닫기
              </button>
              {selectedInquiry.status !== "REPLIED" && (
                <button
                  onClick={() => updateStatus(selectedInquiry.id, "REPLIED")}
                  className="px-4 py-2 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent)]/90"
                >
                  답변완료 처리
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
