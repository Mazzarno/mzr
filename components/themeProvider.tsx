"use client";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Applique le thème DaisyUI en fonction du thème next-themes
    if (theme === "dark" || theme === "light") {
      document.documentElement.setAttribute("data-theme", theme);
    } else if (theme === "system") {
      // Détecte le mode système et applique le thème correspondant
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.setAttribute(
        "data-theme",
        isDarkMode ? "dark" : "light"
      );
    }
  }, [theme]);

  return <>{children}</>;
}
