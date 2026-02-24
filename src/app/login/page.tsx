"use client";


import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <section className="section login">
      <div className="container" style={{ maxWidth: "400px" }}>
        <h1 className="h2 section-title" style={{ textAlign: "center" }}>
          Login
        </h1>

        <form onSubmit={handleSubmit} className="newsletter-form" style={{ maxWidth: "100%" }}>
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
            Sign In
          </button>
        </form>

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Don&apos;t have an account? <Link href="/register" className="hover:underline" style={{ display: "inline" }}>Sign up</Link>
        </p>
      </div>
    </section>
  );
}
