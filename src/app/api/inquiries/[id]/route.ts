import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(inquiry);
  } catch {
    return NextResponse.json(
      { error: "문의 상태 업데이트에 실패했습니다" },
      { status: 500 }
    );
  }
}
