import React from 'react';
import { useI18n } from '../i18n';
import { useRouting } from '../contexts/RoutingContext';

interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
}

const BookingConfirmationPage: React.FC = () => {
  const { t } = useI18n();
  const { selectedProvider, selectedServices, selectedDate, selectedTime, navigate } = useRouting();

  // Service data (mirrored from ServiceSelectionPage)
  const allServices: Service[] = [
    { id: 'women-1', name: 'Haircut & Styling', duration: '60 min', price: 45 },
    { id: 'men-1', name: 'Classic Haircut', duration: '30 min', price: 25 },
    { id: 'kids-1', name: 'Kids Haircut', duration: '20 min', price: 15 },
  ];

  const selectedServiceDetails = allServices.filter((s) => selectedServices.includes(s.id));

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTotalPrice = (): number => {
    return selectedServiceDetails.reduce((sum, s) => sum + s.price, 0);
  };

  const handleBookNow = () => {
    // TODO: Submit booking to backend
    alert('Booking confirmed! Thank you for your appointment.');
    navigate('home');
  };

  const handleBack = () => {
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
          onClick={handleBack}
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
          ← Back to Date/Time
        </button>

        <h1 style={{ color: '#2575fc', marginBottom: '0.5rem' }}>
          {t('booking.confirmTitle')}
        </h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          {selectedProvider.name}
        </p>

        {/* Provider Info */}
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <h2 style={{ color: '#333', fontSize: '1rem', marginBottom: '1rem' }}>
            {t('booking.provider')}
          </h2>
          <p style={{ color: '#444', fontWeight: '600' }}>{selectedProvider.name}</p>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            {selectedProvider.zip} {selectedProvider.city}
          </p>
        </div>

        {/* Service Info */}
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <h2 style={{ color: '#333', fontSize: '1rem', marginBottom: '1rem' }}>
            {t('booking.services')}
          </h2>
          {selectedServiceDetails.map((service) => (
            <div
              key={service.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0',
                borderBottom: '1px solid #eee',
              }}
            >
              <div>
                <p style={{ color: '#444', fontWeight: '500' }}>{service.name}</p>
                <p style={{ color: '#666', fontSize: '0.85rem' }}>{service.duration}</p>
              </div>
              <p style={{ color: '#2575fc', fontWeight: '600' }}>€{service.price}</p>
            </div>
          ))}
        </div>

        {/* Date & Time Info */}
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <h2 style={{ color: '#333', fontSize: '1rem', marginBottom: '1rem' }}>
            {t('booking.dateTime')}
          </h2>
          <p style={{ color: '#444', fontWeight: '500' }}>{formatDate(selectedDate)}</p>
          <p style={{ color: '#2575fc', fontSize: '1.1rem', fontWeight: '600' }}>
            {selectedTime}
          </p>
        </div>

        {/* Total */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: '#f0f7ff',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <span style={{ fontWeight: '600', color: '#333', fontSize: '1.1rem' }}>
            {t('booking.total')}:
          </span>
          <span style={{ fontWeight: '700', color: '#2575fc', fontSize: '1.5rem' }}>
            €{getTotalPrice()}
          </span>
        </div>

        <button
          onClick={handleBookNow}
          style={{
            width: '100%',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            backgroundColor: '#2575fc',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a5fd9'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2575fc'}
        >
          {t('booking.bookNow')}
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;