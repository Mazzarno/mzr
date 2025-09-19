"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

interface ThemeSwitcherProps {
  position?: "top" | "bottom";
}

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
      {showIcon}
    </button>
  );
}
