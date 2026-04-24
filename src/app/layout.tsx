import type { Metadata } from "next";
import "./globals.css";
import { SearchProvider } from "@/components/landing/search-context";
import { ThemeProvider } from "@/providers/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { GeistPixelGrid } from "geist/font/pixel";

const geistPixelGrid = GeistPixelGrid;

export const metadata: Metadata = {
  title: "ascii studio",
  description: "ascii studio",
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ascii studio OG image",
      },
    ],
  },
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full antialiased ${geistPixelGrid.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anonymous+Pro&family=Anton&family=Audiowide&family=Bebas+Neue&family=Chakra+Petch&family=Cinzel&family=Courier+Prime&family=Cutive+Mono&family=DM+Mono&family=DotGothic16&family=Fira+Code&family=Fira+Mono&family=IBM+Plex+Mono&family=Inconsolata&family=Inter&family=JetBrains+Mono&family=Josefin+Sans&family=Montserrat&family=Orbitron&family=Outfit&family=Overpass+Mono&family=Playfair+Display&family=Poppins&family=Press+Start+2P&family=Roboto+Mono&family=Saira+Stencil+One&family=Share+Tech+Mono&family=Silkscreen&family=Source+Code+Pro&family=Space+Mono&family=Syne&family=Teko&family=Ubuntu+Mono&family=VT323&display=swap"
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?font=satoshi@300,400,500,700&font=cabinet-grotesk@400,500,700&display=swap"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SearchProvider>
            {children}
            <Analytics />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
