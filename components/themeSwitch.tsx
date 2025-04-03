"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        aria-label="Toggle theme"
      />
      <Sun size={20} className="swap-off text-yellow-500" />
      <Moon size={20} className="swap-on text-indigo-500" />
    </label>
  );
}
