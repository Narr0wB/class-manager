import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "sussy",
  description: "login page",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}