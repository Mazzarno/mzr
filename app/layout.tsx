import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./components/LanguageProvider";
import ClientLayout from "./components/ClientLayout";
import AnimatedCursor from "react-animated-cursor";
import FaviconUpdater from "./components/FaviconUpdater";


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
      <body className={`${inter.variable} ${despairs.variable} antialiased select-none`}>
        <NextThemesProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          themes={["light", "dark"]}
        >
          <ThemeProvider>
            <LanguageProvider>  
              <FaviconUpdater />
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
              <ClientLayout>
                {children}
              </ClientLayout>
            </LanguageProvider>
          </ThemeProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
