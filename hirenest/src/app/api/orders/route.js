import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id, role } = session.user;

    const where = {};
    if (role === 'CLIENT') where.clientId = id;
    else if (role === 'FREELANCER') where.freelancerId = id;

    const orders = await prisma.order.findMany({
      where,
      include: {
        freelancer: true,
        client: true,
        gig: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("[ORDERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { gigId, freelancerId, amount, title, deadline } = body;

    if (!gigId || !freelancerId || !amount || !title) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        title,
        amount,
        deadline: deadline ? new Date(deadline) : null,
        status: "PENDING",
        gigId,
        freelancerId,
        clientId: session.user.id,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("[ORDERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
