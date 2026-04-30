import React, { useState } from 'react';
import { useI18n } from '../i18n';
import { useRouting } from '../contexts/RoutingContext';
import { getServiceCategoriesForType, ServiceCategory } from '../data/serviceCatalog';

const ServiceSelectionPage: React.FC = () => {
  const { t } = useI18n();
  const { selectedProvider, navigate } = useRouting();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const categories: ServiceCategory[] = selectedProvider
    ? getServiceCategoriesForType(selectedProvider.type)
    : [];

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) => {
      // Find which category the clicked service belongs to
      const clickedCategory = categories.find((cat) =>
        cat.services.some((s) => s.id === serviceId)
      );
      
      if (!clickedCategory) return prev;
      
      // Check if a service from a different category is already selected
      const isFromDifferentCategory = prev.some((selectedId) => {
        return !clickedCategory.services.some((s) => s.id === selectedId);
      });
      
      // If clicking a service from a different category, clear all and select only the new one
      if (isFromDifferentCategory) {
        return [serviceId];
      }
      
      // Otherwise toggle within the same category
      return prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId];
    });
  };

  const getTotalPrice = (): number => {
    return categories.reduce((total, category) => {
      return (
        total +
        category.services
          .filter((s) => selectedServices.includes(s.id))
          .reduce((sum, s) => sum + s.price, 0)
      );
    }, 0);
  };

  const handleContinue = () => {
    // Store selected services in sessionStorage
    sessionStorage.setItem('selectedServices', JSON.stringify(selectedServices));
    navigate('dateTimeSelection', selectedProvider || undefined);
  };

  if (!selectedProvider) {
    navigate('home');
    return null;
  }

  return (
    <div
      style={{
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
        overflow: 'auto',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '3rem 2rem',
          borderRadius: '1.5rem',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          maxWidth: 600,
          width: '100%',
          color: '#333',
        }}
      >
        <button
          onClick={() => navigate('provider', selectedProvider)}
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
            transition: 'all 0.3s',
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
          ← Back to Provider
        </button>

        <h1 style={{ color: '#2575fc', marginBottom: '0.5rem' }}>
          {t('booking.selectServices')}
        </h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          {selectedProvider.name}
        </p>

        {categories.map((category) => (
          <div
            key={category.id}
            style={{
              marginBottom: '1.5rem',
            }}
          >
            <h2
              style={{
                color: '#333',
                fontSize: '1.1rem',
                marginBottom: '1rem',
                paddingBottom: '0.5rem',
                borderBottom: '2px solid #2575fc',
              }}
            >
              {category.label}
            </h2>
            {category.services.map((service) => {
              const isSelected = selectedServices.includes(service.id);
              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    marginBottom: '0.5rem',
                    backgroundColor: isSelected ? '#e8f0fe' : '#f8f9fa',
                    borderRadius: '0.5rem',
                    border: isSelected
                      ? '2px solid #2575fc'
                      : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: '600',
                        color: '#333',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {service.name}
                    </div>
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                      {service.duration}
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: 'right',
                      fontWeight: '600',
                      color: '#2575fc',
                    }}
                  >
                    €{service.price}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {selectedServices.length > 0 && (
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#f0f7ff',
              borderRadius: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontWeight: '600', color: '#333' }}>
              {t('booking.total')}:
            </span>
            <span style={{ fontWeight: '700', color: '#2575fc', fontSize: '1.2rem' }}>
              €{getTotalPrice()}
            </span>
          </div>
        )}

        <button
          onClick={handleContinue}
          disabled={selectedServices.length === 0}
          style={{
            width: '100%',
            marginTop: '1.5rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            backgroundColor: selectedServices.length > 0 ? '#2575fc' : '#ccc',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: selectedServices.length > 0 ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => {
            if (selectedServices.length > 0) {
              e.currentTarget.style.backgroundColor = '#1a5fd9';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedServices.length > 0) {
              e.currentTarget.style.backgroundColor = '#2575fc';
            }
          }}
        >
          {t('booking.continue')}
        </button>
      </div>
    </div>
  );
};

export default ServiceSelectionPage;