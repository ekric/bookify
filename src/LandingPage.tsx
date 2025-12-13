import React, { useState, ChangeEvent } from 'react';
import { useI18n } from './i18n';

interface Provider {
  name: string;
  city: string;
  zip: string;
}

const providers: Provider[] = [
  { name: "Jane's Hair Studio", city: "New York", zip: "10001" },
  { name: "QuickFix Auto", city: "Los Angeles", zip: "90001" },
  { name: "Wellness Spa", city: "Chicago", zip: "60601" },
  { name: "Tech Gurus", city: "San Francisco", zip: "94101" },
  { name: "Pet Care Pro", city: "Austin", zip: "73301" },
  // ... more providers
];

const LandingPage: React.FC = () => {
  const { t, language, setLanguage, availableLanguages } = useI18n();
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<Provider[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length === 0) {
      setResults([]);
      return;
    }
    const filtered = providers.filter(
      p =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.city.toLowerCase().includes(value.toLowerCase()) ||
        p.zip.includes(value)
    );
    setResults(filtered);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem 2rem',
        borderRadius: '1.5rem',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        maxWidth: 300,
        width: '100%',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <label style={{ fontSize: '0.85rem', color: '#666' }}>{t('language')}:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'es' | 'fr' | 'de')}
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #ccc',
              fontSize: '0.85rem',
              cursor: 'pointer',
              backgroundColor: 'white'
            }}
          >
            {availableLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <h1 style={{ color: '#2575fc', marginBottom: '1rem' }}>{t('title')}</h1>
        <p style={{ color: '#444', marginBottom: '2rem' }}>
          {t('description')}
        </p>
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={search}
          onChange={handleSearch}
          style={{
            width: '90%',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid #ccc',
            marginBottom: '1.5rem',
            fontSize: '1rem'
          }}
        />
        {search && (
          <div style={{
            textAlign: 'left',
            maxHeight: 200,
            overflowY: 'auto'
          }}>
            {results.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {results.map((p, idx) => (
                  <li key={idx} style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <strong>{p.name}</strong><br />
                    <span style={{ color: '#666', fontSize: '0.95em' }}>
                      {p.city}, {p.zip}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ color: '#999' }}>{t('noResults')}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage; 