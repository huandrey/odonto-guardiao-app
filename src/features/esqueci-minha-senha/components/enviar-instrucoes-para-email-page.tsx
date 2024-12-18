import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './esqueci-minha-senha-style.css';

export const EnviarInstrucoesParaEmailPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    // Aqui você faria a chamada para a API para enviar o e-mail de redefinição
    // Por enquanto, vamos simular o sucesso
    navigate('/forgot-password-confirmation');
  };

  return (
    <div className="forgot-password-page">
      <div className="app-logo">
        <div className="logo-initials">OG</div>
        <div className="logo-full">OdontoGuardião</div>
      </div>
      <div className="forgot-password-container">
        <h1>Esqueci minha senha</h1>
        <p>Insira seu e-mail para receber as instruções de redefinição de senha.</p>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">Enviar instruções</button>
        </form>
      </div>
    </div>
  );
};
