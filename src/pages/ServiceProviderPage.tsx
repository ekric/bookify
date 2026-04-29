import React from 'react';
import { useI18n } from '../i18n';
import { useRouting } from '../contexts/RoutingContext';
import { ServiceType } from '../contexts/RoutingContext';

const ServiceProviderPage: React.FC = () => {
  const { t } = useI18n();
  const { selectedProvider, navigate } = useRouting();

  if (!selectedProvider) {
    navigate('home');
    return null;
  }

  const getServiceTypeLabel = (type: ServiceType): string => {
    return t(`serviceTypes.${type}`);
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
      boxSizing: 'border-box',
      padding: '2rem',
      overflow: 'auto'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '3rem 2rem',
        borderRadius: '1.5rem',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        maxWidth: 600,
        width: '100%',
        color: '#333'
      }}>
        <button
          onClick={() => navigate('home')}
          style={{
            marginBottom: '1.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid #ccc',
            backgroundColor: 'white',
            color: '#2575fc',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0';
            e.currentTarget.style.borderColor = '#2575fc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.borderColor = '#ccc';
          }}
        >
          ← Back to Search
        </button>

        <h1 style={{ color: '#2575fc', marginBottom: '1rem' }}>
          {selectedProvider.name}
        </h1>

        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#666', fontSize: '0.9rem' }}>Service Type:</strong>
            <p style={{ color: '#333', fontSize: '1.1rem', marginTop: '0.25rem' }}>
              {getServiceTypeLabel(selectedProvider.type)}
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#666', fontSize: '0.9rem' }}>Location:</strong>
            <p style={{ color: '#333', fontSize: '1.1rem', marginTop: '0.25rem' }}>
              {selectedProvider.city}, {selectedProvider.zip}
            </p>
          </div>

          <div>
            <strong style={{ color: '#666', fontSize: '0.9rem' }}>Address:</strong>
            <p style={{ color: '#333', fontSize: '1.1rem', marginTop: '0.25rem' }}>
              {selectedProvider.name}<br />
              {selectedProvider.zip} {selectedProvider.city}
            </p>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{ color: '#2575fc', fontSize: '1.2rem', marginBottom: '1rem' }}>
            About
          </h2>
          <p style={{ color: '#444', lineHeight: '1.6' }}>
            This is a professional service provider offering high-quality services in {selectedProvider.city}.
            Contact us to book an appointment or learn more about our services.
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => {
              navigate('serviceSelection', selectedProvider);
            }}
            style={{
              flex: 1,
              minWidth: '150px',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              backgroundColor: '#2575fc',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a5fd9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2575fc'}
          >
            Book Appointment
          </button>
          <button
            onClick={() => {
              // Handle contact
              alert('Contact functionality coming soon!');
            }}
            style={{
              flex: 1,
              minWidth: '150px',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #2575fc',
              backgroundColor: 'white',
              color: '#2575fc',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f7ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderPage;

