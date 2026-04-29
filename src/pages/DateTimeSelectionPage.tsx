import React, { useState } from 'react';
import { useI18n } from '../i18n';
import { useRouting } from '../contexts/RoutingContext';

interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DateOption {
  date: string;
  label: string;
  available: boolean;
}

const DateTimeSelectionPage: React.FC = () => {
  const { t } = useI18n();
  const { selectedProvider, navigate } = useRouting();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Generate next 14 days
  const getDates = (): DateOption[] => {
    const dates: DateOption[] = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = date.getDate();
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      
      // Simulate availability - weekends have fewer slots
      const dayOfWeek = date.getDay();
      const available = dayOfWeek !== 0 && Math.random() > 0.2;
      
      dates.push({
        date: date.toISOString().split('T')[0],
        label: `${dayName}, ${dayNum} ${month}`,
        available
      });
    }
    
    return dates;
  };

  // Generate time slots (9 AM to 6 PM)
  const getTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    
    for (let hour = 9; hour <= 18; hour++) {
      // Skip lunch break (12-13)
      if (hour === 12) continue;
      
      const time = `${hour.toString().padStart(2, '0')}:00`;
      const available = Math.random() > 0.3; // Simulate availability
      
      slots.push({ time, available });
    }
    
    return slots;
  };

  const dates = getDates();
  const timeSlots = getTimeSlots();

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) return;
    
    // TODO: Navigate to confirmation page with all booking details
    alert(`Booking: ${selectedDate} at ${selectedTime}`);
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
          onClick={() => navigate('serviceSelection', selectedProvider)}
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
          ← Back to Services
        </button>

        <h1 style={{ color: '#2575fc', marginBottom: '0.5rem' }}>
          {t('booking.selectDateTime')}
        </h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          {selectedProvider.name}
        </p>

        {/* Date Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              color: '#333',
              fontSize: '1.1rem',
              marginBottom: '1rem',
            }}
          >
            {t('booking.selectDate')}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '0.5rem',
            }}
          >
            {dates.map((date) => (
              <button
                key={date.date}
                onClick={() => {
                  if (date.available) {
                    setSelectedDate(date.date);
                    setSelectedTime('');
                  }
                }}
                disabled={!date.available}
                style={{
                  padding: '0.75rem 0.5rem',
                  borderRadius: '0.5rem',
                  border: selectedDate === date.date
                    ? '2px solid #2575fc'
                    : '1px solid #ddd',
                  backgroundColor: !date.available
                    ? '#f5f5f5'
                    : selectedDate === date.date
                      ? '#e8f0fe'
                      : 'white',
                  color: !date.available
                    ? '#ccc'
                    : selectedDate === date.date
                      ? '#2575fc'
                      : '#333',
                  cursor: date.available ? 'pointer' : 'not-allowed',
                  fontSize: '0.85rem',
                  fontWeight: selectedDate === date.date ? '600' : '400',
                  transition: 'all 0.2s',
                }}
              >
                {date.label}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div style={{ marginBottom: '2rem' }}>
            <h2
              style={{
                color: '#333',
                fontSize: '1.1rem',
                marginBottom: '1rem',
              }}
            >
              {t('booking.selectTime')}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                gap: '0.5rem',
              }}
            >
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  style={{
                    padding: '0.75rem 0.5rem',
                    borderRadius: '0.5rem',
                    border: selectedTime === slot.time
                      ? '2px solid #2575fc'
                      : '1px solid #ddd',
                    backgroundColor: !slot.available
                      ? '#f5f5f5'
                      : selectedTime === slot.time
                        ? '#e8f0fe'
                        : 'white',
                    color: !slot.available
                      ? '#ccc'
                      : selectedTime === slot.time
                        ? '#2575fc'
                        : '#333',
                    cursor: slot.available ? 'pointer' : 'not-allowed',
                    fontSize: '0.9rem',
                    fontWeight: selectedTime === slot.time ? '600' : '400',
                    transition: 'all 0.2s',
                  }}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
          style={{
            width: '100%',
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            backgroundColor: selectedDate && selectedTime ? '#2575fc' : '#ccc',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: selectedDate && selectedTime ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => {
            if (selectedDate && selectedTime) {
              e.currentTarget.style.backgroundColor = '#1a5fd9';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedDate && selectedTime) {
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

export default DateTimeSelectionPage;