"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    const newLocale = locale === "fr" ? "en" : "fr";
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  return (
    <label className="swap pr-4 link">
      <input
        type="checkbox"
        onChange={toggleLanguage}
        checked={locale === "en"}
      />
      <div className="swap-on"> <span className="text-sm">EN</span></div>
      <div className="swap-off"> <span className="text-sm">FR</span></div>
    </label>
  );
}
