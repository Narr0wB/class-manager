import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "../theme-provider";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Class manager",
  description: "Class manager",
};

type RootLayoutProps = {
  children?: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className, "bg-primary")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;