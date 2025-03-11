"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    const newLocale = locale === "fr" ? "en" : "fr";
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  return (
    <label className="swap pr-4">
      <input
        type="checkbox"
        onChange={toggleLanguage}
        checked={locale === "en"}
      />
      <div className="swap-on">EN</div>
      <div className="swap-off">FR</div>
    </label>
  );
}
