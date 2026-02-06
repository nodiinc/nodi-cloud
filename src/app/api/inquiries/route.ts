import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "모든 필드를 입력해 주세요" },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch {
    return NextResponse.json(
      { error: "문의 접수에 실패했습니다" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(inquiries);
  } catch {
    return NextResponse.json(
      { error: "문의 목록을 불러오는데 실패했습니다" },
      { status: 500 }
    );
  }
}
