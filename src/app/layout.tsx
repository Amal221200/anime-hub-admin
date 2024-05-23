import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import ProgressProvider from "@/components/providers/ProgressProvider";
import QueryProvider from "@/components/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default:"Anime Hub - Admin",
    template: `"Anime Hub - Admin | %s"`
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
    <ClerkProvider appearance={{ baseTheme: dark }}afterSignOutUrl="/auth/sign-in">
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <ProgressProvider>
              <QueryProvider>
                {children}
              </QueryProvider>
            </ProgressProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider> 
  );
}
