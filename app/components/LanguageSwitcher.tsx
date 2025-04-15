"use client";

import React, { memo, useCallback } from "react";
import { useLanguage } from "./LanguageProvider";

const LanguageSwitcher = memo(function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = useCallback(() => {
    const newLocale = locale === "fr" ? "en" : "fr";
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  }, [locale, setLocale]);

  return (
    <button 
      onClick={toggleLanguage} 
      className="text-sm text-neutral-content focus:outline-none"
      aria-label={`Switch to ${locale === "fr" ? "English" : "French"}`}
    >
      {locale === "fr" ? "FR" : "EN"}
    </button>
  );
});

export default LanguageSwitcher;
