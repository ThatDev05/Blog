"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { uploadPostImage } from "@/app/actions/posts";

export const dynamic = 'force-dynamic';

interface FieldErrors {
  title?: string[];
  content?: string[];
  imageUrl?: string[];
  tags?: string[];
}

export default function CreatePostPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent, published: boolean) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);

    try {
      let finalImageUrl = "";
      
      // 1. Upload image to GitHub if selected
      if (imagePreview && image) {
        try {
          const result = await uploadPostImage(imagePreview, image.name);
          finalImageUrl = result.imageUrl;
        } catch (err) {
          throw new Error("Failed to upload image to GitHub. Please check your configuration.");
        }
      }

      // 2. Prepare tags
      const tagsArray = tags.split(",").map(t => t.trim()).filter(t => t !== "");

      // 3. Create post
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          content, 
          published,
          imageUrl: finalImageUrl,
          tags: tagsArray
        }),
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

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="image" style={{ display: "block", marginBottom: "5px" }}>Featured Image</label>
            <input
              type="file"
              id="image"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="email-field"
              style={{ width: "100%", padding: "10px" }}
            />
            {imagePreview && (
              <div style={{ marginTop: "10px", position: "relative", width: "100%", height: "200px" }}>
                <Image 
                  src={imagePreview} 
                  alt="Preview" 
                  fill 
                  style={{ objectFit: "cover", borderRadius: "12px" }} 
                />
              </div>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="tags" style={{ display: "block", marginBottom: "5px" }}>Tags (comma separated)</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="email-field"
              placeholder="e.g. Technology, Lifestyle, Food"
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
            {fieldErrors.content && (
              <p style={{ color: "var(--blue-ryb)", fontSize: "1.3rem", marginTop: "4px" }}>
                {fieldErrors.content[0]}
              </p>
            )}
          </div>

          {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

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
