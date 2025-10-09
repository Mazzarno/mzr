import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from "../components/core/ThemeProvider";
import { LanguageProvider } from "../components/core/LanguageProvider";
import ClientLayout from "./ClientLayout";

const dmSans = localFont({
  src: [
    {
      path: "../public/fonts/DMSans/DMSans_Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-dm-sans",
  preload: true,
});
const figTree = localFont({
  src: [
    {
      path: "../public/fonts/Figtree/Figtree_Light.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Figtree/Figtree_Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Figtree/Figtree_Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Figtree/Figtree_Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-figtree",
  preload: true,
});
export const metadata: Metadata = {
  metadataBase: new URL("https://alexisgermain.fr"),
  applicationName: "Alexis Germain",

  description:
    "J’aide PME & startups à lancer des expériences web performantes avec Next.js/React/TypeScript : accessibilité, SEO solide, design soigné.",
  keywords: [
    "Développeur Web freelance Paris",
    "Création site web",
    "Création site web Val-d'Oise 95",
    "Création site web Oise 60",
    "Création site web Yvelines 78",
    "Alexis Germain",
  ],
  authors: [{ name: "Alexis Germain", url: "https://alexisgermain.fr" }],
  creator: "Alexis Germain",
  publisher: "Alexis Germain",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "/", languages: { "fr-FR": "/", "en-US": "/" } },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://alexisgermain.fr",
    siteName: "Alexis Germain",

    description:
      "Développeur Web freelance à Paris. Next.js/React, performance et SEO. Disponible en remote et sur site.",
    images: [
      {
        url: "/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Portrait d’Alexis Germain — Développeur Web freelance à Paris",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@alexisgermain",
    creator: "@alexisgermain",
    title: "Alexis Germain — Développeur Web freelance à Paris",
    description:
      "Sites et applications web avec Next.js/React. Performance, accessibilité, SEO.",
    images: ["/og/og-default.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [
      {
        url: "../public/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${figTree.variable} font-figtree font-normal antialiased select-none`}
      >
        <NextThemesProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          themes={["light", "dark"]}
        >
          <ThemeProvider>
            <LanguageProvider>
              <ClientLayout>{children}</ClientLayout>
            </LanguageProvider>
          </ThemeProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
