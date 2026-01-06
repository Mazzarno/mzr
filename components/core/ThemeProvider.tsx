"use client";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    const updateTheme = () => {
      if (theme === "dark" || theme === "light") {
        document.documentElement.setAttribute("data-theme", theme);
      } else if (theme === "system") {
        const isDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        document.documentElement.setAttribute(
          "data-theme",
          isDarkMode ? "dark" : "light"
        );
      }
    };

    updateTheme();

    // Listen for OS preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        updateTheme();
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return <>{children}</>;
}
