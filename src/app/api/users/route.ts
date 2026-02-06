import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { decryptEmail } from "@/lib/crypto";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const search = request.nextUrl.searchParams.get("search")?.toLowerCase() || "";

  const users = await prisma.user.findMany({
    include: {
      customer: { select: { id: true, code: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Decrypt emails and apply search filter in memory
  // (emails are encrypted, so DB-level search is not possible)
  const result = users
    .map((user) => {
      let email: string;
      try {
        email = decryptEmail(user.emailEncrypted);
      } catch {
        email = "(복호화 실패)";
      }
      return {
        id: user.id,
        name: user.name,
        email,
        role: user.role,
        customerId: user.customerId,
        customer: user.customer,
        createdAt: user.createdAt,
      };
    })
    .filter((user) => {
      if (!search) return true;
      return (
        user.name?.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
    });

  return NextResponse.json(result);
}
