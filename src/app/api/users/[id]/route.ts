import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Prevent self role change
  if (id === session.user.id) {
    return NextResponse.json({ error: "자기 자신의 역할은 변경할 수 없습니다." }, { status: 400 });
  }

  const { role, customerId } = await request.json();

  const data: Record<string, unknown> = {};
  if (role !== undefined) data.role = role;
  if (customerId !== undefined) data.customerId = customerId || null;

  const user = await prisma.user.update({
    where: { id },
    data,
    include: {
      customer: { select: { id: true, code: true, name: true } },
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Prevent self deletion
  if (id === session.user.id) {
    return NextResponse.json({ error: "자기 자신은 삭제할 수 없습니다." }, { status: 400 });
  }

  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
