import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import { LanguageProvider } from './languageContext';

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Navigation />
      </Router>
    </LanguageProvider>
  );
};

export default App;