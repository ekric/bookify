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
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());

  // Generate calendar days for the current month view
  const getCalendarDays = (): (DateOption | null)[] => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay(); // 0 = Sunday
    
    const days: (DateOption | null)[] = [];
    
    // Add empty slots for days before the first of the month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);
      
      const dayOfWeek = date.getDay();
      const isPast = date < today;
      const isSunday = dayOfWeek === 0;
      
      // Deterministic availability based on date string
      const dateStr = date.toISOString().split('T')[0];
      const hash = dateStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const available = !isPast && !isSunday && (hash % 10) > 2;
      
      days.push({
        date: dateStr,
        label: day.toString(),
        available
      });
    }
    
    return days;
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(calendarDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCalendarDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(calendarDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCalendarDate(newDate);
  };

  const handleCalendarDayClick = (date: DateOption) => {
    if (date && date.available) {
      setSelectedDate(date.date);
      setSelectedTime('');
    }
  };

  // Generate time slots (9 AM to 6 PM)
  const getTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    
    for (let hour = 9; hour <= 18; hour++) {
      // Skip lunch break (12-13)
      if (hour === 12) continue;
      
      const time = `${hour.toString().padStart(2, '0')}:00`;
      
      // Deterministic availability based on date and time
      const hash = (selectedDate + time).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const available = (hash + hour) % 10 > 3;
      
      slots.push({ time, available });
    }
    
    return slots;
  };

  const calendarDays = getCalendarDays();
  const timeSlots = getTimeSlots();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
          
          {/* Calendar Component */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              border: '1px solid #ddd',
              padding: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            {/* Calendar Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <button
                onClick={goToPreviousMonth}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #ddd',
                  backgroundColor: 'white',
                  color: '#333',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                ←
              </button>
              <span style={{ fontWeight: '600', color: '#333' }}>
                {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
              </span>
              <button
                onClick={goToNextMonth}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #ddd',
                  backgroundColor: 'white',
                  color: '#333',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                →
              </button>
            </div>
            
            {/* Day Names Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '0.25rem',
                marginBottom: '0.5rem',
              }}
            >
              {dayNames.map((day) => (
                <div
                  key={day}
                  style={{
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#666',
                    padding: '0.25rem',
                  }}
                >
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '0.25rem',
              }}
            >
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  onClick={() => day && handleCalendarDayClick(day)}
                  disabled={!day || !day.available}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.25rem',
                    border: 'none',
                    backgroundColor: !day
                      ? 'transparent'
                      : !day.available
                        ? '#f5f5f5'
                        : selectedDate === day.date
                          ? '#2575fc'
                          : 'white',
                    color: !day
                      ? 'transparent'
                      : !day.available
                        ? '#ccc'
                        : selectedDate === day.date
                          ? 'white'
                          : '#333',
                    cursor: day && day.available ? 'pointer' : 'not-allowed',
                    fontSize: '0.85rem',
                    fontWeight: day && selectedDate === day.date ? '600' : '400',
                    transition: 'all 0.2s',
                  }}
                >
                  {day ? day.label : ''}
                </button>
              ))}
            </div>
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