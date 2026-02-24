import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/data";
import { CSSProperties } from "react";

type PostWithAuthor = BlogPost & { authorName?: string };

interface PostCardProps {
  post: PostWithAuthor;
  compact?: boolean;
}

export default function PostCard({ post, compact = false }: PostCardProps) {
  return (
    <div className="blog-card">
      <figure
        className="card-banner img-holder"
        style={
          {
            "--width": post.width,
            "--height": post.height,
          } as CSSProperties
        }
      >
        <Image
          src={post.image}
          width={post.width}
          height={post.height}
          alt={post.title}
          className="img-cover"
        />

        <ul className="avatar-list absolute">
          {post.authorImages.map((img, index) => (
            <li className="avatar-item" key={`${img}-${index}`}>
              <Link
                href={post.authorName ? `/author/${encodeURIComponent(post.authorName)}` : "#"}
                className="avatar img-holder"
                style={
                  {
                    "--width": 100,
                    "--height": 100,
                  } as CSSProperties
                }
              >
                <Image
                  src={img}
                  width={100}
                  height={100}
                  alt={post.authorName ?? "Author"}
                  className="img-cover"
                />
              </Link>
            </li>
          ))}
        </ul>
      </figure>

      <div className="card-content">
        {!compact && post.tags.length > 0 && (
          <ul className="card-meta-list">
            {post.tags.map((tag, index) => (
              <li key={`${tag}-${index}`}>
                <Link href="#" className="card-tag">
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <h3 className={compact ? "h5" : "h4"}>
          <Link href={`/blog/${post.id}`} className="card-title hover:underline">
            {post.title}
          </Link>
        </h3>

        {!compact && post.description && (
          <p className="card-text">{post.description}</p>
        )}
      </div>
    </div>
  );
}
