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
    <label className="swap link">
      <input
        type="checkbox"
        onChange={toggleLanguage}
        checked={locale === "en"}
      />
      <div className="swap-on">
        {" "}
        <span className="text-sm">EN</span>
      </div>
      <div className="swap-off">
        {" "}
        <span className="text-sm">FR</span>
      </div>
    </label>
  );
});

export default LanguageSwitcher;
