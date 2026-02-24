"use client";

import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const Header = dynamic(() => import("./Header"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </SessionProvider>
  );
}
