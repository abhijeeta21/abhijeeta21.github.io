'use client';

import { useState } from 'react';
import styles from '../page.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Your Full Name (e.g., John Doe)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            fontFamily: 'var(--font-family-main)',
            borderRadius: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid #333',
            color: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      </div>
      <div className={styles.formGroup}>
        <input
          type="email"
          placeholder="Your Email (e.g., john.doe@example.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            fontFamily: 'var(--font-family-main)',
            borderRadius: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid #333',
            color: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      </div>
      <div className={styles.formGroup}>
        <textarea
          placeholder="Your Message (e.g., Let's collaborate on a project!)"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{
            fontFamily: 'var(--font-family-main)',
            borderRadius: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid #333',
            color: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        ></textarea>
      </div>
      <button
        type="submit"
        className={styles.primaryButton}
        disabled={status === 'sending'}
        style={{
          background: 'linear-gradient(135deg, #000000, #333333)',
          color: 'white',
          fontFamily: 'var(--font-family-main)',
          width: '100%',
          fontSize: '1rem',
          cursor: status === 'sending' ? 'not-allowed' : 'pointer'
        }}
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      
      {status === 'success' && (
        <div style={{ marginTop: '1rem', color: '#06b6d4', fontWeight: 500, textAlign: 'center' }}>
          Thanks for reaching out! I'll get back to you as soon as possible. 🚀
        </div>
      )}
      
      {status === 'error' && (
        <div style={{ marginTop: '1rem', color: '#EF4444', fontWeight: 500, textAlign: 'center' }}>
          Oops! Something went wrong. Try again later or DM me on social media! 🙏
        </div>
      )}
    </form>
  );
}