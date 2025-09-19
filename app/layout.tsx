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
      path: "../public/fonts/DMSans/DMSans_Light.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/DMSans/DMSans_Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/DMSans/DMSans_Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/DMSans/DMSans_Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-dm-sans",
  preload: true,
});

const despairs = localFont({
  src: "../public/fonts/Despairs.ttf",
  display: "swap",
  variable: "--font-despairs",
  preload: true,
});

const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter/Inter_Light.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter/Inter_Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter/Inter_Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter/Inter_Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-inter",
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
  title: "Alexis Germain",
  description: "Alexis Germain - Web Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${despairs.variable} ${inter.variable} ${figTree.variable} font-figtree font-normal antialiased select-none`}
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
