"use client";

import { useState, useTransition } from "react";
import PostCard from "./PostCard";
import { loadMorePosts, type PostCardData } from "@/app/actions/posts";

interface RecentPostsListProps {
  initialPosts: PostCardData[];
  initialCursor: string | null;
}

export default function RecentPostsList({ initialPosts, initialCursor }: RecentPostsListProps) {
  const [posts, setPosts] = useState<PostCardData[]>(initialPosts);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [isPending, startTransition] = useTransition();

  const handleLoadMore = () => {
    if (!cursor) return;
    startTransition(async () => {
      const { posts: newPosts, nextCursor } = await loadMorePosts(cursor);
      setPosts((prev) => [...prev, ...newPosts]);
      setCursor(nextCursor);
    });
  };

  return (
    <>
      <ul className="grid-list">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <li key={`${post.id}-${index}`}>
              <PostCard post={post} />
            </li>
          ))
        ) : (
          <li>
            <p>No posts yet. <a href="/create" style={{ color: "var(--blue-ryb)" }}>Be the first to create one!</a></p>
          </li>
        )}
      </ul>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        {cursor ? (
          <button
            className="btn"
            onClick={handleLoadMore}
            disabled={isPending}
            style={{ opacity: isPending ? 0.7 : 1, cursor: isPending ? "not-allowed" : "pointer" }}
          >
            {isPending ? "Loading..." : "Load more"}
          </button>
        ) : posts.length > 0 ? (
          <p style={{ color: "var(--st-sonic-silver)", fontSize: "1.4rem" }}>
            ✨ You&apos;ve seen all posts!
          </p>
        ) : null}
      </div>
    </>
  );
}
