import { featuredPosts, recommendedPosts } from "@/lib/data";
import PostCard from "./components/PostCard";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function getRecentPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },

      take: 6,
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
    });

    return posts.map((post: { id: string, title: string, content: string, author: { image: string | null, name: string | null }, createdAt: Date }) => ({
        id: post.id,
        title: post.title,
        description: post.content.substring(0, 150) + "...",
        image: "/images/featured-1.jpg", 
        width: 550,
        height: 660,
        tags: ["Community"],
        authorImages: post.author.image ? [post.author.image] : ["/images/author-1.jpg"],
        date: post.createdAt.toISOString().split('T')[0],
    }));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function Home() {
  const recentPosts = await getRecentPosts();

  return (
    <article>
      {/* #HERO */}
      <section className="section hero" aria-label="home">
        <div className="container">
          <h1 className="h1 hero-title">
            <strong className="strong">Hey, we’re Blogy.</strong> See our
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
              See what we’ve <strong className="strong">written lately</strong>
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

          <ul className="grid-list">
            {recentPosts.length > 0 ? (
                recentPosts.map((post: import("@/lib/data").BlogPost, index: number) => (
                <li key={`${post.id}-${index}`}>
                    <PostCard post={post} />
                </li>
                ))
            ) : (
                <li><p>No posts found. Be the first to create one!</p></li>
            )}
          </ul>

          <button className="btn">Load more</button>
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
