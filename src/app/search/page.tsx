import { prisma } from "@/lib/prisma";
import PostCard from "@/app/components/PostCard";
import type { Metadata } from "next";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search: "${q}" – Blogy` : "Search – Blogy",
    description: q ? `Blog posts matching "${q}"` : "Search all posts on Blogy",
  };
}

export const dynamic = "force-dynamic";

async function searchPosts(query: string) {
  if (!query.trim()) return [];
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        author: { select: { name: true, image: true } },
      },
    });

    return posts.map((post) => ({
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
    }));
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const results = await searchPosts(q);

  return (
    <article>
      <section className="section hero" aria-label="search results">
        <div className="container">
          <h1 className="h2 section-title">
            {q ? (
              <>
                Results for <strong className="strong">&quot;{q}&quot;</strong>
              </>
            ) : (
              "Search"
            )}
          </h1>
          {q && (
            <p style={{ color: "var(--eerie-black_60)", marginTop: "8px" }}>
              {results.length} {results.length === 1 ? "post" : "posts"} found
            </p>
          )}
        </div>
      </section>

      <section className="section recent" aria-label="search results list">
        <div className="container">
          {!q ? (
            <p style={{ textAlign: "center", color: "var(--eerie-black_60)" }}>
              Enter a search term in the search bar above.
            </p>
          ) : results.length > 0 ? (
            <ul className="grid-list">
              {results.map((post, index) => (
                <li key={`${post.id}-${index}`}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ textAlign: "center", color: "var(--eerie-black_60)" }}>
              No posts found for &quot;{q}&quot;. Try a different search term.
            </p>
          )}
        </div>
      </section>
    </article>
  );
}
