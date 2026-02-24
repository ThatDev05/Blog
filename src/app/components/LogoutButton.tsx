"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="btn"
      style={{ position: "static", marginTop: "12px" }}
    >
      Logout
    </button>
  );
}
