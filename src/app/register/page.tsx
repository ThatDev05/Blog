"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Registration failed");
      }

      router.push("/login"); // Redirect to login after successful registration
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
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
        maxWidth: "500px", 
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
          Register
        </h1>

        <form onSubmit={handleSubmit} className="newsletter-form" style={{ maxWidth: "100%" }}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="name" style={{ display: "block", marginBottom: "8px", color: '#9ca3af', fontSize: '1.4rem' }}>Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="email-field"
              placeholder="Enter your name"
              style={{ 
                width: "100%", 
                paddingInlineEnd: "20px",
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white'
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
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

          <div style={{ marginBottom: "25px" }}>
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
            Register
          </button>
        </form>

        <p style={{ marginTop: "24px", textAlign: "center", color: '#9ca3af' }}>
          Already have an account? <Link href="/login" className="hover:underline" style={{ display: "inline", color: '#a78bfa' }}>Sign in</Link>
        </p>
      </div>
    </section>
  );
}
