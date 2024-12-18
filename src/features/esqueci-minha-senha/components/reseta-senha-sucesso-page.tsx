import React from 'react';
import { Link } from 'react-router-dom';
import './esqueci-minha-senha-style.css';

export const ResetaSenhaSucessoPage: React.FC = () => {
  return (
    <div className="forgot-password-page">
      <div className="app-logo">
        <div className="logo-initials">OG</div>
        <div className="logo-full">OdontoGuardião</div>
      </div>
      <div className="forgot-password-container">
        <h1>Senha redefinida com sucesso</h1>
        <p>Sua senha foi atualizada. Agora você pode fazer login com sua nova senha.</p>
        <Link to="/login" className="back-to-login">Ir para o login</Link>
      </div>
    </div>
  );
};
