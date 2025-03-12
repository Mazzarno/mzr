"use client";
import AnimatedCursor from "react-animated-cursor";
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
    <>
      <AnimatedCursor
        innerSize={6}
        outerSize={30}
        innerScale={1.5}
        outerScale={2}
        outerAlpha={0}
        innerStyle={{
          backgroundColor: "var(--color-base-content)",
        }}
        outerStyle={{
          border: "1px solid var(--color-base-content)",
        }}
        trailingSpeed={20}
      />
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
    </>
  );
}
