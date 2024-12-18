import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './esqueci-minha-senha-style.css';

export const ResetaSenhaPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    // Aqui você faria a chamada para a API para redefinir a senha
    // Por enquanto, vamos simular o sucesso
    navigate('/reset-password-success');
  };

  return (
    <div className="forgot-password-page">
      <div className="app-logo">
        <div className="logo-initials">OG</div>
        <div className="logo-full">OdontoGuardião</div>
      </div>
      <div className="forgot-password-container">
        <h1>Redefinir senha</h1>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nova senha"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme a nova senha"
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">Redefinir senha</button>
        </form>
      </div>
    </div>
  );
};
