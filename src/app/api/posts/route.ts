
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

export const dynamic = 'force-dynamic';

// ─── Zod Schema ────────────────────────────────────────────────────────────────
const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  published: z.boolean().optional().default(false),
});

// ─── GET: Only return published posts ─────────────────────────────────────────
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
    });

    const transformedPosts = posts.map((post: {
      id: string;
      title: string;
      content: string;
      createdAt: Date;
      author: { name: string | null; image: string | null };
    }) => ({

      id: post.id,
      title: post.title,
      description: post.content.substring(0, 150) + "...",
      image: "/images/featured-1.jpg",
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

// ─── POST: Create a post (with Zod validation + draft support) ──────────────
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = createPostSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { title, content, published } = result.data;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: session.user.id!,
        published,
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
