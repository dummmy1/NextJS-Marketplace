import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('user');

    const ads = await prisma.ad.findMany({
      where: userEmail ? { userEmail } : {},
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(ads);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ad = await prisma.ad.create({
      data: {
        ...body,
        userEmail: session.user.email
      }
    });

    return NextResponse.json({ success: true, ad });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // or parse pathname to get ID
    const session = await getServerSession(authOptions);
    const body = await req.json();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (body.price) {
      body.price = parseFloat(body.price);
    }

    const updatedAd = await prisma.ad.update({
      where: {
        id: id!,
        userEmail: session.user.email,
      },
      data: body,
    });

    return NextResponse.json({ success: true, ad: updatedAd });
  } catch (error: any) {
    console.error("Update error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const ad = await prisma.ad.delete({
      where: {
        id: params.id,
        userEmail: session.user.email,
      },
    });

    return NextResponse.json(ad);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}