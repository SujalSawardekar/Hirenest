import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const query = searchParams.get("q");

    const where = {};
    if (category) where.category = category;
    if (query) {
      where.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    const gigs = await prisma.gig.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(gigs);
  } catch (error) {
    console.error("[GIGS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 1 });
    }

    const body = await req.json();
    const { title, description, price, category, deliveryDays, revisions } = body;

    if (!title || !description || !price || !category) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const gig = await prisma.gig.create({
      data: {
        title,
        description,
        price,
        category,
        deliveryDays,
        revisions,
        userId: session.user.id,
      },
    });

    return NextResponse.json(gig);
  } catch (error) {
    console.error("[GIGS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
