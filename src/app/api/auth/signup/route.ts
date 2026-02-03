import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";
import { hashEmail, encryptEmail } from "@/lib/crypto";

export async function POST(request: NextRequest) {
  const { token, email, password, name } = await request.json();

  // 초대 토큰 검증
  const invitation = await prisma.invitation.findUnique({
    where: { token },
    include: { customer: true },
  });

  if (!invitation) {
    return NextResponse.json({ error: "유효하지 않은 초대 링크입니다." }, { status: 400 });
  }

  if (invitation.acceptedAt) {
    return NextResponse.json({ error: "이미 사용된 초대 링크입니다." }, { status: 400 });
  }

  if (invitation.expiresAt < new Date()) {
    return NextResponse.json({ error: "만료된 초대 링크입니다." }, { status: 400 });
  }

  // 이메일 중복 확인
  const emailHash = hashEmail(email);
  const existingUser = await prisma.user.findUnique({
    where: { email: emailHash },
  });

  if (existingUser) {
    return NextResponse.json({ error: "이미 가입된 이메일입니다." }, { status: 400 });
  }

  // 사용자 생성
  const passwordHash = await hash(password, 12);
  const emailEncrypted = encryptEmail(email);

  await prisma.$transaction([
    prisma.user.create({
      data: {
        email: emailHash,
        emailEncrypted,
        name,
        password: passwordHash,
        role: invitation.role,
        customerId: invitation.customerId,
      },
    }),
    prisma.invitation.update({
      where: { id: invitation.id },
      data: { acceptedAt: new Date() },
    }),
  ]);

  return NextResponse.json({ success: true });
}
