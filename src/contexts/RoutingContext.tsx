import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ServiceType } from '../data/serviceCatalog';
import { Provider, getProviderById } from '../data/providers';

type Route = 'home' | 'about' | 'contact' | 'provider' | 'serviceSelection' | 'dateTimeSelection' | 'bookingConfirmation';

const routeToPath: Record<Exclude<Route, 'provider'>, string> = {
  home: '/',
  about: '/about',
  contact: '/contact',
  serviceSelection: '/book',
  dateTimeSelection: '/book/datetime',
  bookingConfirmation: '/book/confirm'
};

const getPathForRoute = (route: Route, provider?: Provider): string => {
  if (route === 'provider') {
    return provider ? `/provider/${provider.id}` : '/provider';
  }

  return routeToPath[route as Exclude<Route, 'provider'>];
};

const pathToRoute = (pathname: string): Route => {
  if (pathname === '/about') return 'about';
  if (pathname === '/contact') return 'contact';
  if (pathname === '/book/confirm') return 'bookingConfirmation';
  if (pathname === '/book/datetime') return 'dateTimeSelection';
  if (pathname === '/book') return 'serviceSelection';
  if (pathname.startsWith('/provider')) return 'provider';
  return 'home';
};

interface RoutingContextType {
  currentRoute: Route;
  selectedProvider: Provider | null;
  selectedServices: string[];
  selectedDate: string;
  selectedTime: string;
  navigate: (route: Route, provider?: Provider) => void;
  setBookingData: (services: string[], date: string, time: string) => void;
}

const RoutingContext = createContext<RoutingContextType | undefined>(undefined);

export const RoutingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<Route>(() => pathToRoute(window.location.pathname));
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(() => {
    const stored = sessionStorage.getItem('selectedProvider');
    if (stored) return JSON.parse(stored);
    const path = window.location.pathname;
    if (path.startsWith('/provider/')) {
      const providerId = path.split('/')[2];
      return providerId ? getProviderById(providerId) || null : null;
    }
    return null;
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const setBookingData = (services: string[], date: string, time: string) => {
    setSelectedServices(services);
    setSelectedDate(date);
    setSelectedTime(time);
    sessionStorage.setItem('selectedServices', JSON.stringify(services));
    sessionStorage.setItem('selectedDate', date);
    sessionStorage.setItem('selectedTime', time);
  };

  useEffect(() => {
    // Listen for browser back/forward navigation
    const handlePopState = (event: PopStateEvent) => {
      const route = pathToRoute(window.location.pathname);
      setCurrentRoute(route);
      
      if (route === 'provider') {
        const path = window.location.pathname;
        const providerId = path.split('/')[2];
        const providerFromState = event.state?.provider;
        const resolvedProvider = providerFromState || (providerId ? getProviderById(providerId) : null);

        if (resolvedProvider) {
          setSelectedProvider(resolvedProvider);
          sessionStorage.setItem('selectedProvider', JSON.stringify(resolvedProvider));
        } else {
          setSelectedProvider(null);
          sessionStorage.removeItem('selectedProvider');
        }
      } else if (route === 'serviceSelection') {
        const stored = sessionStorage.getItem('selectedProvider');
        if (stored) {
          setSelectedProvider(JSON.parse(stored));
        }
      } else {
        setSelectedProvider(null);
        sessionStorage.removeItem('selectedProvider');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: Route, provider?: Provider) => {
    const path = getPathForRoute(route, provider);
    
    // Update URL
    window.history.pushState({ route, provider }, '', path);
    
    // Update state
    setCurrentRoute(route);
    
    if (provider) {
      setSelectedProvider(provider);
      sessionStorage.setItem('selectedProvider', JSON.stringify(provider));
    } else if (route !== 'provider' && route !== 'serviceSelection') {
      setSelectedProvider(null);
      sessionStorage.removeItem('selectedProvider');
    }
  };

  return (
    <RoutingContext.Provider value={{ 
      currentRoute, 
      selectedProvider, 
      selectedServices,
      selectedDate,
      selectedTime,
      navigate,
      setBookingData
    }}>
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
