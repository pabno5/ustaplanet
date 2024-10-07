import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [idioma, setIdioma] = useState('español');

  const changeLanguage = (newLanguage) => {
    setIdioma(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ idioma, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};