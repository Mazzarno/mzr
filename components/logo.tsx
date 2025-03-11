"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Logo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Image src="/logolight.png" alt="Logo" width={40} height={40} priority />
    );
  }

  return (
    <motion.div
      key={resolvedTheme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Image
        src={resolvedTheme === "dark" ? "/logodark.png" : "/logolight.png"}
        alt="Logo"
        width={50}
        height={50}
        priority
      />
    </motion.div>
  );
}
