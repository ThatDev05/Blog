"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

interface FieldErrors {
  title?: string[];
  content?: string[];
}

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent, published: boolean) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, published }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setError("You must be logged in to create a post.");
          return;
        }
        if (response.status === 400 && data.errors) {
          setFieldErrors(data.errors);
          return;
        }
        throw new Error(data.message || "Failed to create post");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section login">
      <div className="container" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 className="h2 section-title" style={{ textAlign: "center" }}>
          Create New Post
        </h1>

        <form
          onSubmit={(e) => handleSubmit(e, true)}
          className="newsletter-form"
          style={{ maxWidth: "100%" }}
        >
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
            {fieldErrors.title && (
              <p style={{ color: "var(--blue-ryb)", fontSize: "1.3rem", marginTop: "4px" }}>
                {fieldErrors.title[0]}
              </p>
            )}
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
            {fieldErrors.content && (
              <p style={{ color: "var(--blue-ryb)", fontSize: "1.3rem", marginTop: "4px" }}>
                {fieldErrors.content[0]}
              </p>
            )}
          </div>

          {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

          {/* Two buttons: Save Draft and Publish */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              type="button"
              className="btn"
              disabled={loading}
              onClick={(e) => handleSubmit(e as unknown as React.FormEvent, false)}
              style={{ position: "static", flex: 1, opacity: loading ? 0.7 : 1, background: "var(--eerie-black_60)" }}
            >
              {loading ? "Saving..." : "Save as Draft"}
            </button>

            <button
              type="submit"
              className="btn"
              disabled={loading}
              style={{ position: "static", flex: 1, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
