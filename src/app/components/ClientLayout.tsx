"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const Header = dynamic(() => import("./Header"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
