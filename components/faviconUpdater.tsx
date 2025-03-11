"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function FaviconUpdater() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof document !== "undefined") {
      const setFavicon = (faviconPath: string) => {
        const link = document.querySelector("link[rel='icon']");
        if (link) {
          link.remove();
        }
        const newLink = document.createElement("link");
        newLink.rel = "icon";
        newLink.href = faviconPath;
        newLink.type = "image/x-icon";
        document.head.appendChild(newLink);
      };

      setFavicon(
        resolvedTheme === "dark" ? "/favicondark.ico" : "/faviconlight.ico"
      );
    }
  }, [resolvedTheme]);

  return null;
}
