
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { uploadToGithub } from "@/lib/githubUpload";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        // 200KB limit
        if (selectedFile.size > 200 * 1024) {
            setMessage({ text: "Image size must be less than 200KB", type: "error" });
            return;
        }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      let imageUrl = image;

      if (file) {
        const githubUrl = await uploadToGithub(image, file.name);
        if (githubUrl) {
          imageUrl = githubUrl;
        }
      }

      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image: imageUrl }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updatedUser = await res.json();
      
      // Update next-auth session
      await update({
        ...session,
        user: {
          ...session?.user,
          name: updatedUser.name,
          image: updatedUser.image,
        },
      });

      setMessage({ text: "Profile updated successfully!", type: "success" });
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage({ text: "An error occurred while updating profile", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!session) return <p>Loading...</p>;

  return (
    <section className="section login" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card-premium" style={{ maxWidth: "500px", width: "100%", padding: "40px" }}>
        <h1 className="hero-title-gradient" style={{ textAlign: "center", marginBottom: "30px", fontSize: "3rem" }}>Edit Profile</h1>
        
        <form onSubmit={handleSubmit} className="newsletter-form" style={{ maxWidth: '100%' }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div style={{ position: "relative", width: "120px", height: "120px", margin: "0 auto", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(255,255,255,0.1)" }}>
              <Image 
                src={image || "/images/author-1.jpg"} 
                alt="Profile" 
                fill 
                style={{ objectFit: "cover" }}
              />
            </div>
            <label htmlFor="pfp-upload" style={{ display: "inline-block", marginTop: "15px", cursor: "pointer", color: "#a78bfa", fontWeight: 600 }}>
              Change Photo
              <input 
                id="pfp-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#9ca3af" }}>Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="email-field"
              placeholder="Your Name"
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
            />
          </div>

          {message.text && (
            <p style={{ color: message.type === "success" ? "#10b981" : "#ef4444", marginBottom: "20px", textAlign: "center" }}>
              {message.text}
            </p>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            className="btn-premium" 
            style={{ width: "100%", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </section>
  );
}
