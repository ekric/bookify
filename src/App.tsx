import React from 'react';
import { I18nProvider } from './i18n';
import LandingPage from './LandingPage';

const App: React.FC = () => {
  return (
    <I18nProvider>
      <div className="App">
        <LandingPage />
      </div>
    </I18nProvider>
  );
};

export default App;