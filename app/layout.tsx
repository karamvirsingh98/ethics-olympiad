import "./globals.css";

import type { Metadata } from "next";
import { Chivo_Mono, Outfit } from "next/font/google";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

const dmMono = Chivo_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Ethics Olympiad",
  description: "Ethics Olympiad System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html
        lang="en"
        suppressHydrationWarning
        className={cn(
          "antialiased",
          "font-sans",
          outfit.variable,
          dmMono.variable
        )}
      >
        <head />
        <body className="h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
