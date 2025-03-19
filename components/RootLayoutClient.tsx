"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import FaviconUpdater from "@/components/FaviconUpdater";
import { LanguageProvider } from "@/components/LanguageProvider";
import Transition from "@/components/Transition";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <Transition isLoading={loading} setIsLoading={setLoading}>
      <LanguageProvider>
        <FaviconUpdater />
        <Navbar />
        {children}
      </LanguageProvider>
    </Transition>
  );
}