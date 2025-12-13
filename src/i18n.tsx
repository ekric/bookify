import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from './translations/en.json';
import esTranslations from './translations/es.json';
import frTranslations from './translations/fr.json';
import deTranslations from './translations/de.json';

type Language = 'en' | 'es' | 'fr' | 'de';

type Translations = typeof enTranslations;

const translations: Record<Language, Translations> = {
  en: enTranslations,
  es: esTranslations,
  fr: frTranslations,
  de: deTranslations,
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
  availableLanguages: { code: Language; name: string }[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
};

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get language from localStorage, fallback to browser language or 'en'
    const saved = localStorage.getItem('bookify-language') as Language;
    if (saved && translations[saved]) {
      return saved;
    }
    const browserLang = navigator.language.split('-')[0] as Language;
    return translations[browserLang] ? browserLang : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bookify-language', lang);
  };

  const t = (key: keyof Translations): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const availableLanguages = Object.entries(languageNames).map(([code, name]) => ({
    code: code as Language,
    name,
  }));

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

