import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/custom/theme/theme-provider";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/custom/auth/session-provider";
import Nav from "@/components/custom/home/nav-bar/nav";
import HeaderBar from "@/components/custom/layout/header-bar";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Class manager",
  description: "Class manager",
};

type RootLayoutProps = {
  children?: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className, "w-screen h-screen flex flex-col lg:overflow-hidden lg:xl:2xl")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider session={session}>
            <HeaderBar className="p-4 z-10" />
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;