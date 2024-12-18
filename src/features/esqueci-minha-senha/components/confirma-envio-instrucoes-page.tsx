import React from 'react';
import { Link } from 'react-router-dom';
import './esqueci-minha-senha-style.css';

export const ConfirmaEnvioInstrucoesPage: React.FC = () => {
  return (
    <div className="forgot-password-page">
      <div className="app-logo">
        <div className="logo-initials">OG</div>
        <div className="logo-full">OdontoGuardião</div>
      </div>
      <div className="forgot-password-container">
        <h1>E-mail enviado</h1>
        <p>Enviamos um e-mail com instruções para redefinir sua senha. Por favor, verifique sua caixa de entrada.</p>
        <Link to="/login" className="back-to-login">Voltar para o login</Link>
      </div>
    </div>
  );
};
