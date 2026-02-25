import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientLayout from "./components/ClientLayout";
import "./globals.css";

const inter = Inter({
  variable: "--ff-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Blogy",
  description: "Blogy - Hey, we’re Blogy. See our thoughts, stories and ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <div className="premium-mesh-gradient" />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
