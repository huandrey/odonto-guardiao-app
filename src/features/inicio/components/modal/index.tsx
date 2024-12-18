import React from "react";
import './modal.css';

interface ModalProps {
  onAnonymous: () => void;
  onIdentify: () => void;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ onAnonymous, onIdentify, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Escolha como deseja continuar</h2>
        <button className="modal-button" onClick={onAnonymous}>
          Entrar Anonimamente
        </button>
        <button className="modal-button" onClick={onIdentify}>
          Identificar-se
        </button>
        <button className="modal-close" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};
