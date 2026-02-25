"use client";

import dynamic from "next/dynamic";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

const Header = dynamic(() => import("./Header"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });

function LayoutContent({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const pathname = usePathname();
  
  // Hide Header/Footer ONLY if on root page AND NOT authenticated
  const isLandingPage = pathname === "/" && status === "unauthenticated";

  return (
    <>
      {!isLandingPage && <Header />}
      <main>{children}</main>
      {!isLandingPage && <Footer />}
    </>
  );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <LayoutContent>{children}</LayoutContent>
    </SessionProvider>
  );
}
