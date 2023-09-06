// LanguageProvider.tsx
import { createContext, useContext, ReactNode, useState } from "react";
import en from "@/translations/en.json";
import ru from "@/translations/ru.json";

type LanguageContextType = {
  language: string;
  changeLanguage: (newLanguage: string) => void;
  translations: Record<string, string>; // Объект для хранения переводов
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<string>("en"); // Установите начальный язык
  const [translations, setTranslations] = useState<Record<string, string>>(en); // Начальные переводы

  const changeLanguage = (newLanguage: string) => {
    if (newLanguage === "en") {
      setLanguage("en");
      setTranslations(en);
    } else if (newLanguage === "ru") {
      setLanguage("ru");
      setTranslations(ru);
    }
  };

  return (
    <LanguageContext.Provider
      value={{ language, changeLanguage, translations }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
