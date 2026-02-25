
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

const updatePostSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Get post error:", error);
    return NextResponse.json({ message: "Error fetching post" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const post = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.authorId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const result = updatePostSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: result.data,
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Update post error:", error);
    return NextResponse.json({ message: "Error updating post" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const post = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.authorId !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.post.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json({ message: "Error deleting post" }, { status: 500 });
  }
}
