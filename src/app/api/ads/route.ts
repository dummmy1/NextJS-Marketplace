import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, price, category, description, contact, imageUrl } = body;

    const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
         return new NextResponse("Unauthorized", { status: 401 });
        }

    const ad = await prisma.ad.create({
      data: {
        title,
        price,
        category,
        description,
        imageUrl,
        contact,
        userEmail: session.user.email,
      },
    });

    return NextResponse.json({ success: true, ad });
  } catch (error: any) {
    console.error("Error saving ad:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
