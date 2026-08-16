import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { CONFIG } from "@/config";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/site-footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import SiteNav from "@/components/site-nav";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const siteTitle = `${CONFIG.name} | ${CONFIG.title}`;
const siteDescription = CONFIG.descriptionRaw;

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${CONFIG.name}`,
  },
  description: siteDescription,
  alternates: {
    canonical: CONFIG.siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: CONFIG.siteUrl,
    siteName: CONFIG.name,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="zh-CN" suppressHydrationWarning>
        <head>
          <meta
            name="google-site-verification"
            content="kMkiYVJqqIhu8LsCDe8BTV0Juty1tXWM9ur8S3_eENg"
          />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          {process.env.NODE_ENV === "production" && (
            <GoogleAnalytics gaId="G-32FLEBL3F6" />
          )}
          <Analytics />
          <LanguageProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              <main className="mx-auto max-w-2xl py-4 md:max-w-4xl md:pt-4 lg:max-w-6xl xl:max-w-7xl">
                <SiteNav />
                {children}
                <SiteFooter />
              </main>
            </ThemeProvider>
          </LanguageProvider>
        </body>
      </html>
    </>
  );
}
