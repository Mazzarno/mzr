"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { NextIntlClientProvider } from "next-intl";
import frMessages from "@/locales/fr.json";
import enMessages from "@/locales/en.json";

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage doit être utilisé dans un LanguageProvider");
  }
  return context;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState("fr");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLocale = localStorage.getItem("locale");
      if (storedLocale) {
        setLocale(storedLocale);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", locale);
    }
  }, [locale]);

  const messages = useMemo(
    () => (locale === "fr" ? frMessages : enMessages),
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone="Europe/Paris"
      >
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}
