
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
    });

    // Transform to match frontend BlogPost interface partially
    const transformedPosts = posts.map((post: { id: string, title: string, content: string, author: { image: string | null, name: string | null }, createdAt: Date }) => ({
        id: post.id,
        title: post.title,
        description: post.content.substring(0, 150) + "...",
        image: "/images/featured-1.jpg", // Default image as we don't have image upload yet
        width: 500,
        height: 600,
        tags: ["Community"],
        authorImages: post.author.image ? [post.author.image] : ["/images/author-1.jpg"],
        date: post.createdAt.toISOString().split('T')[0],
    }));

    return NextResponse.json(transformedPosts);
  } catch {
    return NextResponse.json({ message: "Error fetching posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await req.json();

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: session.user.id!,
        published: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error creating post" },
      { status: 500 }
    );
  }
}
