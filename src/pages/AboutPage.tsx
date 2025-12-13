import React from 'react';
import { useI18n } from '../i18n';

const AboutPage: React.FC = () => {
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
        maxWidth: 600,
        width: '100%',
        color: '#333'
      }}>
        <h1 style={{ color: '#2575fc', marginBottom: '1.5rem' }}>About Us</h1>
        <p style={{ color: '#444', lineHeight: '1.6', marginBottom: '1rem' }}>
          Bookify is your trusted platform for finding and booking appointments with top service providers across Germany.
        </p>
        <p style={{ color: '#444', lineHeight: '1.6', marginBottom: '1rem' }}>
          We connect you with professionals in various fields including hair salons, auto repair shops, wellness centers, IT services, and more.
        </p>
        <p style={{ color: '#444', lineHeight: '1.6' }}>
          Our mission is to make booking appointments simple, fast, and convenient for everyone.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;

