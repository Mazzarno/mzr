"use client";

import Transition from "@/components/Transition";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function ClientLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [loading, setLoading] = useState(true);
  
    return (
      <Transition isLoading={loading} setIsLoading={setLoading}>
        <AnimatePresence mode="wait">
          {!loading && children}
        </AnimatePresence>
      </Transition>
    );
}