"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentTheme =
      theme === "system"
        ? systemTheme === "dark"
          ? "mzr-dark"
          : "mzr-light"
        : theme === "dark"
        ? "mzr-dark"
        : "mzr-light";

    document.documentElement.setAttribute("data-theme", currentTheme);
    const root = document.documentElement;
    const isDark = currentTheme === "mzr-dark";
    root.style.setProperty(
      "--color-base-100",
      isDark ? "oklch(24.353% 0 0)" : "oklch(95.127% 0.007 260.731)"
    );
    root.style.setProperty(
      "--color-base-content",
      isDark ? "oklch(84.87% 0 0)" : "oklch(32.437% 0.022 264.182)"
    );
  }, [theme, resolvedTheme, systemTheme]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <label className="flex items-center gap-2 cursor-pointer link">
      <Sun
        size={20}
        className={`transition-all duration-500 ${
          isDark ? "opacity-50 text-gray-500" : "opacity-100 text-yellow-500"
        }`}
      />
      <input
        type="checkbox"
        className="toggle theme-controller transition-all duration-1000"
        checked={isDark}
        onChange={() => setTheme(isDark ? "light" : "dark")}
      />
      <Moon
        size={20}
        className={`transition-all duration-500 ${
          isDark ? "opacity-100 text-indigo-500" : "opacity-50 text-gray-500"
        }`}
      />
    </label>
  );
}
