
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, image } = body;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || undefined,
        image: image || undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Error updating profile" },
      { status: 500 }
    );
  }
}
