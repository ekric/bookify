import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from './translations/en.json';
import deTranslations from './translations/de.json';

type Language = 'en' | 'de';

type Translations = typeof enTranslations;

const translations: Record<Language, Translations> = {
  en: enTranslations,
  de: deTranslations,
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations | string) => string;
  availableLanguages: { code: Language; name: string }[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const languageNames: Record<Language, string> = {
  en: 'English',
  de: 'Deutsch',
};

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get language from localStorage, fallback to browser language or 'en'
    const saved = localStorage.getItem('bookify-language') as Language;
    if (saved && translations[saved]) {
      return saved;
    }
    const browserLang = navigator.language.split('-')[0];
    return (browserLang === 'de' || browserLang === 'en') ? browserLang as Language : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bookify-language', lang);
  };

  const t = (key: keyof Translations | string): string => {
    const currentTranslations = translations[language];
    const fallbackTranslations = translations.en;
    
    // Handle nested keys like "serviceTypes.hair"
    if (key.includes('.')) {
      const keys = key.split('.');
      let value: any = currentTranslations;
      let fallback: any = fallbackTranslations;
      
      for (const k of keys) {
        value = value?.[k];
        fallback = fallback?.[k];
      }
      
      return value || fallback || key;
    }
    
    return (currentTranslations[key as keyof Translations] as string) || 
           (fallbackTranslations[key as keyof Translations] as string) || 
           key;
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

