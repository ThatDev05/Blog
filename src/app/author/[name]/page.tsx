import { getPostsByAuthor } from "@/app/actions/posts";
import PostCard from "@/app/components/PostCard";
import Image from "next/image";
import type { Metadata } from "next";

interface AuthorPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { name } = await params;
  const authorName = decodeURIComponent(name);
  return {
    title: `${authorName} – Blogy`,
    description: `Read all posts by ${authorName} on Blogy.`,
  };
}

export const revalidate = 60;

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { name } = await params;
  const authorName = decodeURIComponent(name);
  const posts = await getPostsByAuthor(authorName);

  return (
    <article>
      <section className="section hero" aria-label="author profile">
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            className="avatar img-holder"
            style={{ width: "80px", height: "80px", borderRadius: "50%", flexShrink: 0 }}
          >
            <Image
              src="/images/author-1.jpg"
              width={80}
              height={80}
              alt={authorName}
              className="img-cover"
              style={{ borderRadius: "50%" }}
            />
          </div>

          <div>
            <h1 className="h2">{authorName}</h1>
            <p style={{ color: "var(--eerie-black_60)", marginTop: "6px" }}>
              {posts.length} published {posts.length === 1 ? "post" : "posts"}
            </p>
          </div>
        </div>
      </section>

      <section className="section recent" aria-label="author posts">
        <div className="container">
          {posts.length > 0 ? (
            <ul className="grid-list">
              {posts.map((post, index) => (
                <li key={`${post.id}-${index}`}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ textAlign: "center", color: "var(--eerie-black_60)" }}>
              No published posts yet.
            </p>
          )}
        </div>
      </section>
    </article>
  );
}
