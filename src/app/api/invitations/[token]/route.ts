import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { token },
    include: { customer: true },
  });

  if (!invitation) {
    return NextResponse.json({ valid: false, error: "초대 링크를 찾을 수 없습니다." });
  }

  if (invitation.acceptedAt) {
    return NextResponse.json({ valid: false, error: "이미 사용된 초대 링크입니다." });
  }

  if (invitation.expiresAt < new Date()) {
    return NextResponse.json({ valid: false, error: "만료된 초대 링크입니다." });
  }

  return NextResponse.json({
    valid: true,
    customerName: invitation.customer.name,
  });
}
