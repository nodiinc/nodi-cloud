import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/crypto";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { customerId, role = "USER", expiresInDays = 7 } = await request.json();

  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!customer) {
    return NextResponse.json({ error: "고객을 찾을 수 없습니다." }, { status: 404 });
  }

  const token = generateToken();
  const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);

  const invitation = await prisma.invitation.create({
    data: {
      token,
      customerId,
      role,
      invitedBy: session.user.id,
      expiresAt,
    },
  });

  const inviteUrl = `${process.env.NEXTAUTH_URL}/signup/${invitation.token}`;

  return NextResponse.json({ invitation, inviteUrl });
}
