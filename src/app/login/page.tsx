"use client";


import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    }
  };

  return (
    <section className="section login" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-card-premium" style={{ 
        maxWidth: "450px", 
        width: '100%', 
        padding: '40px',
        margin: '0 auto'
      }}>
        <h1 className="hero-title-gradient" style={{ 
          textAlign: "center", 
          fontSize: '3rem', 
          fontWeight: 800,
          marginBottom: '30px',
          background: 'linear-gradient(to right, #fff, #9ca3af)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Login
        </h1>

        <form onSubmit={handleSubmit} className="newsletter-form" style={{ maxWidth: "100%" }}>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "8px", color: '#9ca3af', fontSize: '1.4rem' }}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-field"
              placeholder="Enter your email"
              style={{ 
                width: "100%", 
                paddingInlineEnd: "20px",
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white'
              }}
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "8px", color: '#9ca3af', fontSize: '1.4rem' }}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="email-field"
              placeholder="Enter your password"
              style={{ 
                width: "100%", 
                paddingInlineEnd: "20px",
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white'
              }}
            />
          </div>

          {error && <p style={{ color: "#ef4444", marginBottom: "20px", textAlign: 'center' }}>{error}</p>}

          <button type="submit" className="btn-premium" style={{ 
            width: "100%", 
            background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
            color: 'white',
            padding: '14px',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '1.6rem',
            border: 'none',
            cursor: 'pointer'
          }}>
            Sign In
          </button>
        </form>

        <p style={{ marginTop: "24px", textAlign: "center", color: '#9ca3af' }}>
          Don&apos;t have an account? <Link href="/register" className="hover:underline" style={{ display: "inline", color: '#a78bfa' }}>Sign up</Link>
        </p>
      </div>
    </section>
  );
}
