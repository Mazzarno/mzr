import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from "@/components/ThemeProvider";
import ClientLayout from "@/components/ClientLayout";




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
            <ClientLayout>
              {children}
            </ClientLayout>
          </ThemeProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
