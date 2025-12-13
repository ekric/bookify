import React from 'react';
import { I18nProvider } from './i18n';
import { RoutingProvider, useRouting } from './contexts/RoutingContext';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServiceProviderPage from './pages/ServiceProviderPage';

const AppContent: React.FC = () => {
  const { currentRoute } = useRouting();

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'provider':
        return <ServiceProviderPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App" style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto'
    }}>
      <NavBar />
      {renderPage()}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <I18nProvider>
      <RoutingProvider>
        <AppContent />
      </RoutingProvider>
    </I18nProvider>
  );
};

export default App;