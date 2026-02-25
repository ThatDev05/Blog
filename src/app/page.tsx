import { featuredPosts, recommendedPosts } from "@/lib/data";
import PostCard from "./components/PostCard";
import RecentPostsList from "./components/RecentPostsList";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import { prisma } from "@/lib/prisma";
import type { PostCardData } from "@/app/actions/posts";

import { auth } from "@/auth";
import LandingPage from "./components/LandingPage";

// ISR: regenerate at most once per minute so new posts appear quickly
export const revalidate = 60;

const BATCH_SIZE = 6;

async function getInitialPosts(): Promise<{ posts: PostCardData[]; nextCursor: string | null }> {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: BATCH_SIZE + 1,
      include: {
        author: { select: { name: true, image: true } },
      },
    });

    const hasMore = posts.length > BATCH_SIZE;
    const page = hasMore ? posts.slice(0, BATCH_SIZE) : posts;

    return {
      posts: page.map((post: {
        id: string;
        title: string;
        content: string;
        imageUrl: string | null;
        tags: string[];
        createdAt: Date;
        author: { name: string | null; image: string | null };
      }) => ({
        id: post.id,
        title: post.title,
        description: post.content.substring(0, 150) + "...",
        image: post.imageUrl || "/images/featured-1.jpg",
        width: 550,
        height: 660,
        tags: post.tags.length > 0 ? post.tags : ["Community"],
        authorImages: post.author.image ? [post.author.image] : ["/images/author-1.jpg"],
        authorName: post.author.name ?? "Anonymous",
        date: post.createdAt.toISOString().split("T")[0],
      })),
      nextCursor: hasMore ? page[page.length - 1].id : null,
    };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return { posts: [], nextCursor: null };
  }
}

export default async function Home() {
  const session = await auth();

  if (!session) {
    return <LandingPage />;
  }

  const { posts: initialPosts, nextCursor } = await getInitialPosts();

  return (
    <article>
      {/* #HERO */}
      <section className="section hero" aria-label="home">
        <div className="container">
          <h1 className="h1 hero-title">
            <strong className="strong">Hey, we&apos;re Blogy.</strong> See our
            thoughts, stories and ideas.
          </h1>
        </div>
      </section>

      {/* #FEATURED POST */}
      <section className="section featured" aria-label="featured post">
        <div className="container">
          <p className="section-subtitle">
            Get started with our <strong className="strong">best stories</strong>
          </p>

          <ul className="has-scrollbar">
            {featuredPosts.map((post: import("@/lib/data").BlogPost, index: number) => (
              <li className="scrollbar-item" key={`${post.id}-${index}`}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* #RECENT POST */}
      <section className="section recent" aria-label="recent post" id="recent-posts">
        <div className="container">
          <div className="title-wrapper">
            <h2 className="h2 section-title">
              See what we&apos;ve <strong className="strong">written lately</strong>
            </h2>

            <div className="top-author">
              <ul className="avatar-list">
                <li className="avatar-item">
                  <Link
                    href="#"
                    className="avatar large img-holder"
                    style={{ "--width": 100, "--height": 100 } as CSSProperties}
                  >
                    <Image
                      src="/images/author-1.jpg"
                      width={100}
                      height={100}
                      alt="top author"
                      className="img-cover"
                    />
                  </Link>
                </li>
                <li className="avatar-item">
                  <Link
                    href="#"
                    className="avatar large img-holder"
                    style={{ "--width": 100, "--height": 100 } as CSSProperties}
                  >
                    <Image
                      src="/images/author-2.jpg"
                      width={100}
                      height={100}
                      alt="top author"
                      className="img-cover"
                    />
                  </Link>
                </li>
              </ul>
              <span className="span">Meet our top authors</span>
            </div>
          </div>

          {/* Client component handles Load More state */}
          <RecentPostsList initialPosts={initialPosts} initialCursor={nextCursor} />
        </div>
      </section>

      {/* #RECOMMENDED POST */}
      <section className="section recommended" aria-label="recommended post">
        <div className="container">
          <p className="section-subtitle">
            <strong className="strong">Recommended</strong>
          </p>

          <ul className="grid-list">
            {recommendedPosts.map((post: import("@/lib/data").BlogPost, index: number) => (
              <li key={`${post.id}-${index}`}>
                <PostCard post={post} compact={true} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
