import React from 'react';
import { useNavigate } from 'react-router-dom';
import './inicio-v2-content.css';
// import kidImage from '../../assets/kid.png'

export const InicioV2Content = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setIsModalOpen(true);
  };

  const handleAnonymous = () => {
    navigate('/home');
  };

  const handleIdentify = () => {
    navigate('/register');
  };

  return (
    <div className="welcome-screen">
      {/* <img className="animated-kid-image" src={kidImage} alt="logo-kid" width={200} height={200} /> */}
      <div className="animated-kid-image"><p className="animated-text-content">OG</p></div>
      <div className="welcome-content">
        <h1 className="app-title">OdontoGuardião</h1>
        <p className="app-description">
          Desenvolvido para auxiliar na identificação de vítimas de maus-tratos e violência.
        </p>
        <button className="start-button" onClick={handleStart}>
          Iniciar
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Como deseja continuar?</h2>
            <p>Escolha se quer se identificar ou manter o anonimato.</p>
            <div className="modal-buttons">
              <button onClick={handleAnonymous}>Manter Anonimato</button>
              <button onClick={handleIdentify}>Identificar-se</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
