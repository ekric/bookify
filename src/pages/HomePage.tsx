import React, { useState, ChangeEvent } from 'react';
import { useI18n } from '../i18n';
import { useRouting } from '../contexts/RoutingContext';
import { Provider } from '../contexts/RoutingContext';
import { ServiceType } from '../data/serviceCatalog';

const providers: Provider[] = [
  { name: "Friseur am Brandenburger Tor", city: "Berlin", zip: "10115", type: "hair" },
  { name: "Autowerkstatt München Süd", city: "München", zip: "80331", type: "auto" },
  { name: "Wellness Oase Hamburg", city: "Hamburg", zip: "20095", type: "wellness" },
  { name: "IT-Service Frankfurt", city: "Frankfurt am Main", zip: "60311", type: "it" },
  { name: "Tierpflege Köln", city: "Köln", zip: "50667", type: "pet" },
  { name: "Zahnarztpraxis Stuttgart", city: "Stuttgart", zip: "70173", type: "dental" },
  { name: "Massage Studio Düsseldorf", city: "Düsseldorf", zip: "40213", type: "massage" },
  { name: "Fitness Center Dortmund", city: "Dortmund", zip: "44135", type: "fitness" },
  { name: "Rechtsanwaltskanzlei Essen", city: "Essen", zip: "45127", type: "legal" },
];

const HomePage: React.FC = () => {
  const { t } = useI18n();
  const { navigate } = useRouting();
  const [search, setSearch] = useState<string>('');
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | 'all'>('all');
  const [results, setResults] = useState<Provider[]>([]);

  const serviceTypes: ServiceType[] = ['hair', 'auto', 'wellness', 'it', 'pet', 'dental', 'massage', 'fitness', 'legal'];

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    filterProviders(value, selectedServiceType);
  };

  const handleServiceTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const serviceType = e.target.value as ServiceType | 'all';
    setSelectedServiceType(serviceType);
    filterProviders(search, serviceType);
  };

  const filterProviders = (searchValue: string, serviceType: ServiceType | 'all') => {
    if (searchValue.length === 0 && serviceType === 'all') {
      setResults([]);
      return;
    }

    const filtered = providers.filter(p => {
      // Filter by service type
      const matchesServiceType = serviceType === 'all' || p.type === serviceType;

      // Filter by search text
      const matchesSearch = searchValue.length === 0 ||
        p.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        p.city.toLowerCase().includes(searchValue.toLowerCase()) ||
        p.zip.includes(searchValue);

      return matchesServiceType && matchesSearch;
    });

    setResults(filtered);
  };

  return (
    <div style={{
      height: '100vh',
      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      paddingTop: '80px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem 2rem',
        borderRadius: '1.5rem',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        maxWidth: 300,
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#2575fc', marginBottom: '1rem' }}>{t('title')}</h1>
        <p style={{ color: '#444', marginBottom: '2rem' }}>
          {t('description')}
        </p>
        <div style={{ 
          marginBottom: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}>
          <label style={{
            display: 'block',
            textAlign: 'center',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
            color: '#666',
            width: '210px'
          }}>
            {t('serviceType')}:
          </label>
          <select
            value={selectedServiceType}
            onChange={handleServiceTypeChange}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
              fontSize: '1rem',
              cursor: 'pointer',
              backgroundColor: 'white',
              boxSizing: 'border-box',
              width: '210px'
            }}
          >
            <option value="all">{t('allServices')}</option>
            {serviceTypes.map((type) => (
              <option key={type} value={type}>
                {t(`serviceTypes.${type}`)}
              </option>
            ))}
          </select>
        </div>
        <div style={{ 
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}>
          <label style={{
            display: 'block',
            textAlign: 'center',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
            color: '#666',
            width: '210px'
          }}>
            {t('search')}:
          </label>
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={handleSearch}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
              fontSize: '1rem',
              boxSizing: 'border-box',
              width: '210px'
            }}
          />
        </div>
        {(search || selectedServiceType !== 'all') && (
          <div style={{
            textAlign: 'center',
            marginTop: '0.5rem',
            width: '210px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {results.length > 0 ? (
              <>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {results.slice(0, 5).map((p, idx) => (
                    <li key={idx} style={{
                      padding: '0.5rem 0',
                    }}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('provider', p);
                        }}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          display: 'block',
                          padding: '0.5rem',
                          borderRadius: '0.25rem',
                          transition: 'background-color 0.2s',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f0f0f0';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <strong style={{ color: '#2575fc' }}>{p.name}</strong><br />
                        <span style={{ color: '#666', fontSize: '0.95em' }}>
                          {p.city}, {p.zip}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                {results.length > 5 && (
                  <div style={{
                    color: '#999',
                    fontSize: '0.85rem',
                    marginTop: '0.5rem',
                    fontStyle: 'italic'
                  }}>
                    {results.length - 5} {t('moreResults')}...
                  </div>
                )}
              </>
            ) : (
              <div style={{ color: '#999', padding: '0.5rem 0' }}>{t('noResults')}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

