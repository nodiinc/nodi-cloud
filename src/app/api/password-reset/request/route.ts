import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashEmail, decryptEmail, generateToken } from "@/lib/crypto";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const emailHash = hashEmail(email);
  const user = await prisma.user.findUnique({
    where: { email: emailHash },
  });

  // Return success even if user doesn't exist (security)
  if (!user) {
    return NextResponse.json({ success: true });
  }

  // Delete existing tokens
  await prisma.passwordResetToken.deleteMany({
    where: { email: emailHash },
  });

  // Generate new token
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.passwordResetToken.create({
    data: {
      token,
      email: emailHash,
      expiresAt,
    },
  });

  // Send email
  const decryptedEmail = decryptEmail(user.emailEncrypted);
  await sendPasswordResetEmail(decryptedEmail, token);

  return NextResponse.json({ success: true });
}
