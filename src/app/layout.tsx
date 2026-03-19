import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/landing/navbar";
import { SearchProvider } from "@/components/landing/search-context";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "ascii studio",
  description: "ascii studio",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SearchProvider>
            <Navbar />
            {children}
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
