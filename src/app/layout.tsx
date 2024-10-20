import "./globals.css";
import type { Metadata } from "next";
import { Inter as Font } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { cookies } from "next/headers";
import { verify_jwt } from "@/lib/jwt";
import { ProgressBar } from "@/components/progressbar";

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
  const token = cookies().get("auth-token")?.value;
  const authenticated = await verify_jwt(token);

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
          <Navbar authenticated={authenticated} />
          <div className="py-12 container flex flex-col gap-12">{children}</div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
