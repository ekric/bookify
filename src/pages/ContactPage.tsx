import React from 'react';
import { useI18n } from '../i18n';

const ContactPage: React.FC = () => {
  const { t } = useI18n();

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
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '3rem 2rem',
        borderRadius: '1.5rem',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        maxWidth: 500,
        width: '100%',
        color: '#333'
      }}>
        <h1 style={{ color: '#2575fc', marginBottom: '2rem' }}>Contact Us</h1>
        <div style={{ textAlign: 'left', lineHeight: '2' }}>
          <p style={{ color: '#444', marginBottom: '1rem' }}>
            <strong>Email:</strong> contact@bookify.de
          </p>
          <p style={{ color: '#444', marginBottom: '1rem' }}>
            <strong>Phone:</strong> +49 (0) 30 12345678
          </p>
          <p style={{ color: '#444', marginBottom: '1rem' }}>
            <strong>Address:</strong><br />
            Bookify GmbH<br />
            Musterstraße 123<br />
            10115 Berlin, Germany
          </p>
          <p style={{ color: '#444', marginTop: '2rem', fontStyle: 'italic' }}>
            We're here to help! Reach out to us with any questions or concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

