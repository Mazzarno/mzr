"use client";
import Transition from "@/components/transition";
import Navbar from "@/components/navbar";
import FaviconUpdater from "@/components/faviconUpdater";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/LanguageProvider";
export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Transition>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <FaviconUpdater />
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </Transition>
  );
}
