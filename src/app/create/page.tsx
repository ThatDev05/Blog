"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        if (response.status === 401) {
            setError("You must be logged in to create a post.");
            return;
        }
        const data = await response.json();
        throw new Error(data.message || "Failed to create post");
      }

      router.push("/"); // Redirect to home on success
      router.refresh(); // Refresh to see new post
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
         setError("An unexpected error occurred");
      }
    }
  };

  return (
    <section className="section login">
      <div className="container" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 className="h2 section-title" style={{ textAlign: "center" }}>
          Create New Post
        </h1>

        <form onSubmit={handleSubmit} className="newsletter-form" style={{ maxWidth: "100%" }}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="title" style={{ display: "block", marginBottom: "5px" }}>Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="email-field"
              placeholder="Enter post title"
              style={{ width: "100%", paddingInlineEnd: "20px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="content" style={{ display: "block", marginBottom: "5px" }}>Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="email-field"
              placeholder="Write your story..."
              style={{ width: "100%", padding: "15px", height: "200px", borderRadius: "16px", resize: "vertical" }}
            />
          </div>

          {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

          <button type="submit" className="btn" style={{ position: "static", width: "100%" }}>
            Publish Post
          </button>
        </form>
      </div>
    </section>
  );
}
