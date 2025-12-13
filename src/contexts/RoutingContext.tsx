import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ServiceType = 'hair' | 'auto' | 'wellness' | 'it' | 'pet' | 'dental' | 'massage' | 'fitness' | 'legal';

export interface Provider {
  name: string;
  city: string;
  zip: string;
  type: ServiceType;
}

type Route = 'home' | 'about' | 'contact' | 'provider';

const routeToPath: Record<Route, string> = {
  home: '/',
  about: '/about',
  contact: '/contact',
  provider: '/provider'
};

const pathToRoute = (pathname: string): Route => {
  if (pathname === '/about') return 'about';
  if (pathname === '/contact') return 'contact';
  if (pathname.startsWith('/provider')) return 'provider';
  return 'home';
};

interface RoutingContextType {
  currentRoute: Route;
  selectedProvider: Provider | null;
  navigate: (route: Route, provider?: Provider) => void;
}

const RoutingContext = createContext<RoutingContextType | undefined>(undefined);

export const RoutingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<Route>(() => pathToRoute(window.location.pathname));
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(() => {
    // Try to get provider from sessionStorage if available
    const stored = sessionStorage.getItem('selectedProvider');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    // Listen for browser back/forward navigation
    const handlePopState = (event: PopStateEvent) => {
      const route = pathToRoute(window.location.pathname);
      setCurrentRoute(route);
      
      // Restore provider from history state if available
      if (route === 'provider' && event.state?.provider) {
        setSelectedProvider(event.state.provider);
        sessionStorage.setItem('selectedProvider', JSON.stringify(event.state.provider));
      } else if (route !== 'provider') {
        setSelectedProvider(null);
        sessionStorage.removeItem('selectedProvider');
      } else if (route === 'provider') {
        // Try to restore from sessionStorage
        const stored = sessionStorage.getItem('selectedProvider');
        if (stored) {
          setSelectedProvider(JSON.parse(stored));
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: Route, provider?: Provider) => {
    const path = routeToPath[route];
    
    // Update URL
    window.history.pushState({ route, provider }, '', path);
    
    // Update state
    setCurrentRoute(route);
    
    if (provider) {
      setSelectedProvider(provider);
      sessionStorage.setItem('selectedProvider', JSON.stringify(provider));
    } else if (route !== 'provider') {
      setSelectedProvider(null);
      sessionStorage.removeItem('selectedProvider');
    }
  };

  return (
    <RoutingContext.Provider value={{ currentRoute, selectedProvider, navigate }}>
      {children}
    </RoutingContext.Provider>
  );
};

export const useRouting = (): RoutingContextType => {
  const context = useContext(RoutingContext);
  if (!context) {
    throw new Error('useRouting must be used within a RoutingProvider');
  }
  return context;
};

