
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { uploadPostImage } from "@/app/actions/posts";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [published, setPublished] = useState(false);
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const post = await res.json();
        
        setTitle(post.title);
        setContent(post.content);
        setTags(post.tags.join(", "));
        setImagePreview(post.imageUrl);
        setPublished(post.published);
      } catch (err) {
        console.error(err);
        setError("Could not load post data.");
      } finally {
        setFetching(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 200 * 1024) {
        setError("Image size must be less than 200KB.");
        setImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
      setError("");
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let finalImageUrl = imagePreview;
      
      if (image && imagePreview) {
        const result = await uploadPostImage(imagePreview, image.name);
        finalImageUrl = result.imageUrl;
      }

      const tagsArray = tags.split(",").map(t => t.trim()).filter(t => t !== "");

      const response = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          content, 
          published,
          imageUrl: finalImageUrl,
          tags: tagsArray
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update post");
      }

      router.push(`/blog/${id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <section className="section login"><div className="container"><p style={{ textAlign: 'center' }}>Loading post...</p></div></section>;

  return (
    <section className="section login">
      <div className="container" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 className="h2 section-title" style={{ textAlign: "center" }}>
          Edit Post
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
          </div>

          <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
            <input 
              type="checkbox" 
              id="published" 
              checked={published} 
              onChange={(e) => setPublished(e.target.checked)} 
              style={{ width: "20px", height: "20px" }}
            />
            <label htmlFor="published" style={{ fontSize: "1.6rem" }}>Published</label>
          </div>

          {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{ position: "static", width: "100%", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Saving Changes..." : "Update Post"}
          </button>
        </form>
      </div>
    </section>
  );
}
