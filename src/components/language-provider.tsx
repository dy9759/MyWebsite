"use client";

import { CONFIG, CONFIG_EN } from "@/config";
import { AI_CONFIG } from "@/ai-config";
import { AI_CONFIG_EN } from "@/ai-config-en";
import { SITE_COPY } from "@/site-copy";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "zh" | "en";

const STORAGE_KEY = "personal-site-language";


type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh");
  const [hasLoadedStoredLanguage, setHasLoadedStoredLanguage] = useState(false);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "zh" || stored === "en") {
      setLanguageState(stored);
    }
    setHasLoadedStoredLanguage(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedStoredLanguage) return;

    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [hasLoadedStoredLanguage, language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const formatCountLabel = (
  language: Language,
  label: string,
  count: number,
) => (language === "zh" ? `${label}（${count}）` : `${label} (${count})`);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

export function useSiteCopy() {
  const { language } = useLanguage();
  return SITE_COPY[language];
}

export function useSiteConfig() {
  const { language } = useLanguage();
  return language === "en" ? CONFIG_EN : CONFIG;
}

export function useAIConfig() {
  const { language } = useLanguage();
  return language === "en" ? AI_CONFIG_EN : AI_CONFIG;
}
