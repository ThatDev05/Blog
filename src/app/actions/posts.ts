"use server";

import { prisma } from "@/lib/prisma";

export type PostCardData = {
  id: string;
  title: string;
  description: string;
  image: string;
  width: number;
  height: number;
  tags: string[];
  authorImages: string[];
  authorName: string;
  date: string;
};

const BATCH_SIZE = 6;

function transformPost(post: {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author: { name: string | null; image: string | null };
}): PostCardData {
  return {
    id: post.id,
    title: post.title,
    description: post.content.substring(0, 150) + "...",
    image: "/images/featured-1.jpg",
    width: 550,
    height: 660,
    tags: ["Community"],
    authorImages: post.author.image ? [post.author.image] : ["/images/author-1.jpg"],
    authorName: post.author.name ?? "Anonymous",
    date: post.createdAt.toISOString().split("T")[0],
  };
}

export async function loadMorePosts(cursor: string): Promise<{
  posts: PostCardData[];
  nextCursor: string | null;
}> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: BATCH_SIZE + 1,
    cursor: { id: cursor },
    skip: 1,
    include: {
      author: { select: { name: true, image: true } },
    },
  });

  const hasMore = posts.length > BATCH_SIZE;
  const page = hasMore ? posts.slice(0, BATCH_SIZE) : posts;

  return {
    posts: page.map(transformPost),
    nextCursor: hasMore ? page[page.length - 1].id : null,
  };
}

export async function getPostsByAuthor(name: string): Promise<PostCardData[]> {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      author: { name },
    },
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { name: true, image: true } },
    },
  });

  return posts.map(transformPost);
}
