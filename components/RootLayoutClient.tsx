"use client";
import { useState, useEffect } from "react";
import AnimatedCursor from "react-animated-cursor";
import Transition from "@/components/transition";
import Navbar from "@/components/navbar";
import FaviconUpdater from "@/components/faviconUpdater";
import { ThemeProvider } from "@/components/themeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import Loading from "@/components/Loading";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>
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
        <FaviconUpdater />
        <Navbar />
        <Transition>{children}</Transition>
      </LanguageProvider>
    </ThemeProvider>
  );
}
