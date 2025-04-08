// src/components/AuthForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ onAuthSuccess, isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? '/api/Auth/login' : '/api/Auth/register';
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
        email,
        password
      });

      onAuthSuccess(res.data); // e.g., store token or user
    } catch (err) {
      setError('Authentication failed');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ display: 'block', margin: '0.5rem 0' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: 'block', margin: '0.5rem 0' }}
      />
      <button type="submit">{isLogin ? 'Log In' : 'Sign Up'}</button>
    </form>
  );
};

export default AuthForm;
