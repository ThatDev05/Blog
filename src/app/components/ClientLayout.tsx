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
  
  // Hide Header/Footer on landing (unauth), login, and register pages
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isUnauthLanding = pathname === "/" && status === "unauthenticated";
  const hideNavigation = isAuthPage || isUnauthLanding;

  return (
    <>
      {!hideNavigation && <Header />}
      <main>{children}</main>
      {!hideNavigation && <Footer />}
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
