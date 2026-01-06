"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeSwitcherProps {
  position?: "top" | "bottom";
}

const iconVariants = {
  initial: { opacity: 0, rotate: -90, scale: 0.5 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 90, scale: 0.5 },
};

export default function ThemeSwitcher({
  position = "top",
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isDark = theme === "dark";
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };
  const showCurrentIcon = position === "top";
  const iconKey = showCurrentIcon
    ? (isDark ? "moon-top" : "sun-top")
    : (isDark ? "sun-bottom" : "moon-bottom");

  const showIcon = showCurrentIcon ? (
    isDark ? (
      <Moon size={17} className="text-indigo-500" />
    ) : (
      <Sun size={17} className="text-yellow-500" />
    )
  ) : isDark ? (
    <Sun size={17} className="text-yellow-500" />
  ) : (
    <Moon size={17} className="text-indigo-500" />
  );

  return (
    <button
      onClick={toggleTheme}
      className="focus:outline-none"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={iconKey}
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          {showIcon}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
