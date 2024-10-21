import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { getServerSession } from "next-auth";
import HeaderBar from "@/app/components/header/HeaderBar";
import SessionProvider from "./components/SessionProvider";
import { Toaster } from "@/components/ui/toaster";
import LayoutProvider from "./components/LayoutProvider";

const font = Poppins({ weight: "400", subsets: ["latin"] });

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
      <body className={cn(font.className, "absolute w-screen h-screen overflow-hidden lg:xl:2xl")}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SessionProvider session={session}>
            <LayoutProvider>
              <HeaderBar />
              <Toaster />
              {children}
            </LayoutProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout;