import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./components/LanguageProvider";
import ClientLayout from "./components/ClientLayout";

const dmSans = localFont({
  src: "../public/fonts/DMSans.ttf",
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

export const metadata: Metadata = {
  title: "Alxs Grmn",
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
        className={`${dmSans.variable} ${despairs.variable} antialiased select-none`}
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
