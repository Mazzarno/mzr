"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation'; 
import Transition from "@/components/Transition"; 
import Interface from "@/components/Interface"; 

interface ClientLayoutProps { 
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); 
    return () => clearTimeout(timer);
  }, [pathname]); 
  useEffect(() => {
    setLoading(true);
  }, [pathname]);
  return (
    <Transition isLoading={loading} setIsLoading={setLoading}>
      <AnimatePresence mode="wait">
   
        {!loading && (
          <Interface pathname={pathname}> 
            {children} 
          </Interface>
        )}
      </AnimatePresence>
    </Transition>
  );
}
