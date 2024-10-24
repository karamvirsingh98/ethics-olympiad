import "./globals.css";
import type { Metadata } from "next";
import { Inter as Font } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ProgressBar } from "@/components/progressbar";
import { parseTokenFromCookies } from "@/lib/server-utils";
import { zUserRole } from "@/lib/entities";

export const metadata: Metadata = { title: "Ethics Olympiad App" };
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const font = Font({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let role: zUserRole | undefined = undefined;
  try {
    const user = parseTokenFromCookies();
    role = user.role;
  } catch {}

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProgressBar />
          <Navbar role={role} />
          <div className="py-12 container flex flex-col gap-12">{children}</div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
