
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CSSProperties } from "react";
import { featuredPosts, recommendedPosts } from "@/lib/data";
import PostCard from "@/app/components/PostCard";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

async function getPost(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
    });
    return post;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return { title: "Post Not Found – Blogy" };
  }

  const description = post.content.substring(0, 155);

  return {
    title: `${post.title} – Blogy`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      authors: [post.author.name ?? "Blogy Author"],
      publishedTime: post.createdAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}


export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    // If not found in DB, check mock data for legacy posts (optional, but good for demo)
    const mockPost = [...featuredPosts, ...recommendedPosts].find(p => p.id === id);
    if (!mockPost) {
        return notFound();
    }
    // Render mock post if found (omitted for brevity, prioritizing DB)
    // For now, just 404 if not in DB to encourage using real data
    return notFound();
  }

  return (
    <article>
        <div className="container" style={{ marginTop: "100px", marginBottom: "50px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                 <figure className="img-holder" style={{ "--width": 800, "--height": 450, borderRadius: "20px", marginBottom: "30px" } as CSSProperties}>
                    <Image
                        src={post.imageUrl || "/images/featured-1.jpg"}
                        width={800}
                        height={450}
                        alt={post.title}
                        className="img-cover"
                    />
                 </figure>

                 <div className="post-meta" style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "15px", flexWrap: "wrap" }}>
                    <div className="author" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div className="avatar img-holder" style={{ width: "40px", height: "40px", borderRadius: "50%" }}>
                            <Image 
                                src={post.author.image || "/images/author-1.jpg"} 
                                width={40} 
                                height={40} 
                                alt={post.author.name || "Author"}
                                className="img-cover"
                            />
                        </div>
                        <span className="h6">{post.author.name || "Anonymous"}</span>
                    </div>
                    <span style={{ color: "var(--light-gray-1)" }}>•</span>
                    <time dateTime={post.createdAt.toISOString()} style={{ color: "var(--eerie-black_60)" }}>
                        {new Date(post.createdAt).toLocaleDateString()}
                    </time>
                    
                    {post.tags.length > 0 && (
                      <ul style={{ display: "flex", gap: "8px", listStyle: "none", padding: 0 }}>
                        {post.tags.map((tag: string, index: number) => (
                          <li key={`${tag}-${index}`}>
                            <span className="card-tag">{tag}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                 </div>

                 <h1 className="h2" style={{ marginBottom: "20px" }}>{post.title}</h1>

                 <div className="post-content" style={{ fontSize: "1.8rem", lineHeight: "1.8" }}>
                    {post.content.split('\n').map((paragraph: string, index: number) => (
                        <p key={index} style={{ marginBottom: "15px" }}>{paragraph}</p>
                    ))}
                 </div>
            </div>
        </div>

        {/* Recommended Section (Static for now) */}
        <section className="section recommended" aria-label="recommended post">
        <div className="container">
          <p className="section-subtitle">
            <strong className="strong">You might also like</strong>
          </p>

          <ul className="grid-list">
            {recommendedPosts.slice(0, 3).map((post, index) => (
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
