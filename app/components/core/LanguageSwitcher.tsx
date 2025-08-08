"use client";

import React, { memo, useCallback } from "react";
import { useLanguage } from "./LanguageProvider";

const LanguageSwitcher = memo(function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = useCallback(() => {
    const newLocale = locale === "fr" ? "en" : "fr";
    setLocale(newLocale);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", newLocale);
    }
  }, [locale, setLocale]);

  return (
    <div className="relative overflow-hidden h-5 group">
      <div
        className="transition-transform duration-300 transform group-hover:-translate-y-5"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="block">
          <button
            onClick={toggleLanguage}
            className="text-sm text-neutral-content focus:outline-none font-dm-sans font-medium"
            aria-label={`Switch to ${locale === "fr" ? "English" : "French"}`}
          >
            {locale === "fr" ? "FR" : "EN"}
          </button>
        </div>
        <div className="block">
          <button
            onClick={toggleLanguage}
            className="text-sm text-neutral-content focus:outline-none font-dm-sans font-medium"
            aria-label={`Switch to ${locale === "fr" ? "English" : "French"}`}
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>
        </div>
      </div>
    </div>
  );
});

export default LanguageSwitcher;
