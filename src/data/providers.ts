import { ServiceType } from './serviceCatalog';

export interface Provider {
  id: string;
  name: string;
  city: string;
  zip: string;
  type: ServiceType;
}

export const providers: Provider[] = [
  { id: 'friseur-am-brandenburger-tor', name: 'Friseur am Brandenburger Tor', city: 'Berlin', zip: '10115', type: 'hair' },
  { id: 'autowerkstatt-muenchen-sued', name: 'Autowerkstatt München Süd', city: 'München', zip: '80331', type: 'auto' },
  { id: 'wellness-oase-hamburg', name: 'Wellness Oase Hamburg', city: 'Hamburg', zip: '20095', type: 'wellness' },
  { id: 'it-service-frankfurt', name: 'IT-Service Frankfurt', city: 'Frankfurt am Main', zip: '60311', type: 'it' },
  { id: 'tierpflege-koeln', name: 'Tierpflege Köln', city: 'Köln', zip: '50667', type: 'pet' },
  { id: 'zahnarztpraxis-stuttgart', name: 'Zahnarztpraxis Stuttgart', city: 'Stuttgart', zip: '70173', type: 'dental' },
  { id: 'massage-studio-duesseldorf', name: 'Massage Studio Düsseldorf', city: 'Düsseldorf', zip: '40213', type: 'massage' },
  { id: 'fitness-center-dortmund', name: 'Fitness Center Dortmund', city: 'Dortmund', zip: '44135', type: 'fitness' },
  { id: 'rechtsanwaltskanzlei-essen', name: 'Rechtsanwaltskanzlei Essen', city: 'Essen', zip: '45127', type: 'legal' }
];

export const getProviderById = (id: string): Provider | undefined => {
  return providers.find((provider) => provider.id === id);
};

export const getProviderPath = (provider: Provider): string => `/provider/${provider.id}`;
