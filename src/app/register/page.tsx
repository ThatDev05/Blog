
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <section className="section login">
      <div className="container" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h1 className="h2 section-title" style={{ textAlign: "center" }}>
          Register
        </h1>

        <form onSubmit={handleSubmit} className="newsletter-form" style={{ maxWidth: "100%" }}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="email-field"
              placeholder="Enter your name"
              style={{ width: "100%", paddingInlineEnd: "20px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-field"
              placeholder="Enter your email"
              style={{ width: "100%", paddingInlineEnd: "20px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="email-field"
              placeholder="Enter your password"
              style={{ width: "100%", paddingInlineEnd: "20px" }}
            />
          </div>

          {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

          <button type="submit" className="btn" style={{ position: "static", width: "100%" }}>
            Register
          </button>
        </form>

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Already have an account? <Link href="/login" className="hover:underline" style={{ display: "inline" }}>Sign in</Link>
        </p>
      </div>
    </section>
  );
}
