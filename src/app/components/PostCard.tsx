"use client";

import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/data";

type PostWithAuthor = BlogPost & { authorName?: string; authorId?: string };

interface PostCardProps {
  post: PostWithAuthor;
  compact?: boolean;
}

export default function PostCard({ post, compact = false }: PostCardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const isAuthor = session?.user?.id === post.authorId;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete post");
      
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error deleting post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="blog-card" style={{ opacity: isDeleting ? 0.5 : 1 }}>
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

        {isAuthor && !compact && (
          <div className="author-actions" style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            gap: '10px',
            zIndex: 10
          }}>
            <Link 
              href={`/blog/${post.id}/edit`} 
              className="action-btn" 
              style={{ padding: '8px', background: 'rgba(0,0,0,0.6)', borderRadius: '8px', color: 'white', display: 'flex' }}
            >
              <IoPencilOutline size={20} />
            </Link>
            <button 
              onClick={handleDelete} 
              disabled={isDeleting}
              className="action-btn" 
              style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.8)', borderRadius: '8px', color: 'white', display: 'flex', border: 'none', cursor: 'pointer' }}
            >
              <IoTrashOutline size={20} />
            </button>
          </div>
        )}
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
