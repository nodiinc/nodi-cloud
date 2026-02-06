import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { decryptEmail } from "@/lib/crypto";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      users: { select: { id: true, name: true, emailEncrypted: true, role: true } },
      gateways: { select: { id: true, serial: true } },
      invitations: {
        where: { acceptedAt: null },
        select: { id: true, token: true, expiresAt: true, acceptedAt: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  // 이메일 복호화
  const usersWithEmail = customer.users.map((user: { id: string; name: string | null; emailEncrypted: string; role: string }) => ({
    ...user,
    email: decryptEmail(user.emailEncrypted),
    emailEncrypted: undefined,
  }));

  return NextResponse.json({ ...customer, users: usersWithEmail });
}
