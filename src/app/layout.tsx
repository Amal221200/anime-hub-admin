import "./globals.css";

import type { Metadata } from "next";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/providers/ThemeProvider";
import ProgressProvider from "@/components/providers/ProgressProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { ourFileRouter } from "../lib/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Anime Hub - Admin",
    template: `Anime Hub - Admin | %s`
  },
  description: "Application for admin users.",
  icons: [{
    url: "/favicon-dark.ico",
    href: "/favicon-dark.ico",
    type: "icon/ico"
  }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }} >
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <QueryProvider>
              <ProgressProvider>
                <NextSSRPlugin
                  /**
                   * The `extractRouterConfig` will extract **only** the route configs
                   * from the router to prevent additional information from being
                   * leaked to the client. The data passed to the client is the same
                   * as if you were to fetch `/api/uploadthing` directly.
                   */
                  routerConfig={extractRouterConfig(ourFileRouter)}
                />
                {children}
              </ProgressProvider>
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
