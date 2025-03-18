import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/themeProvider";
import RootLayoutClient from "@/components/RootLayoutClient";

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
 
          <RootLayoutClient>{children}</RootLayoutClient>
 
      </body>
    </html>
  );
}
