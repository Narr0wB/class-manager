import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "../../components/custom/theme/theme-provider";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/custom/auth/session-provider";

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
      <body className={cn(font.className, "bg-primary")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;