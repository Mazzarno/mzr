import { createContext, useContext, useState, useEffect } from "react";
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
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale) {
      setLocale(storedLocale);
    }
  }, []);

  const messages = locale === "fr" ? frMessages : enMessages;

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider
        key={locale}
        locale={locale}
        messages={messages}
        timeZone="Europe/Paris"
      >
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}
