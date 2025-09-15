

import type { Metadata } from "next";
import "./globals.css";
import "./press-start-font.css";
import RouteLoader from "@/components/RouteLoader";

export const metadata: Metadata = {
  title: "OriginForge Games Survey - Shape the Future of Gaming Identity",
  description: "Help us build the ultimate gaming identity platform. Share your feedback and be part of the OriginForge revolution.",
  keywords: "gaming, blockchain, identity, survey, originforge, achievements, gaming platform",
  authors: [{ name: "OriginForge Games" }],
  creator: "OriginForge Games",
  publisher: "OriginForge Games",
  metadataBase: new URL("https://survey.originforge.games"),
  openGraph: {
    title: "OriginForge Games Survey",
    description: "Help us build the ultimate gaming identity platform",
    url: "https://survey.originforge.games",
    siteName: "OriginForge Games Survey",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OriginForge Games Survey",
    description: "Help us build the ultimate gaming identity platform",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased font-press-start">
  <RouteLoader>{children}</RouteLoader>
      </body>
    </html>
  );
}

