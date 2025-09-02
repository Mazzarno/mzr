"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function FaviconUpdater() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const currentTheme = resolvedTheme || theme;
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href =
      currentTheme === "dark" ? "/favicondark.ico" : "/faviconlight.ico";
  }, [theme, resolvedTheme]);
  return null;
}
