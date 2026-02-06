import { NextRequest, NextResponse } from "next/server";
import { getAdminSession, Role } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/crypto";
import { isSesConfigured, sendInvitationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { customerId, role = Role.OPERATOR, expiresInDays = 7, email, sendEmail } =
    await request.json();

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

  // Send invitation email if requested and SES is configured
  let emailSent = false;
  if (sendEmail && email && isSesConfigured()) {
    try {
      await sendInvitationEmail(email, inviteUrl, customer.name);
      emailSent = true;
    } catch {
      // Email send failed, but invitation was created successfully
    }
  }

  return NextResponse.json({ invitation, inviteUrl, emailSent });
}
