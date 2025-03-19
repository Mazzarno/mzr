import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from "@/components/ThemeProvider";
import RootLayoutClient from "@/components/RootLayoutClient";
import AnimatedCursor from "react-animated-cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const despairs = localFont({
  src: "../public/fonts/Despairs.ttf",
  display: "swap",
  variable: "--font-despairs",
});

export const metadata: Metadata = {
  title: "Alexis Germain - Web Developer",
  description: "Alexis Germain - Web Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${despairs.variable} antialiased`}>
        <NextThemesProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          themes={["light", "dark"]}
        >
          <ThemeProvider>
            <AnimatedCursor
              innerSize={4}
              outerSize={30}
              innerScale={1.5}
              outerScale={1.5}
              outerAlpha={0}
              innerStyle={{
                backgroundColor: "var(--color-base-content)",
              }}
              outerStyle={{
                border: "1px solid var(--color-base-content)",
              }}
              trailingSpeed={10}
            />
            <RootLayoutClient>{children}</RootLayoutClient>
          </ThemeProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
