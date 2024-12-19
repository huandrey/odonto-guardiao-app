import React, { useState } from 'react';
import './style.css';

interface CroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { state: string; croNumber: string }) => void;
}

export const CroModal: React.FC<CroModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [state, setState] = useState('');
  const [croNumber, setCroNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ state, croNumber });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Identificação Profissional</h2>
          <p className="modal-subtitle">Por favor, insira seus dados de registro no CRO</p>
        </div>

        <div className="privacy-notice">
          <svg className="privacy-notice-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
          </svg>
          Não se preocupe! Nenhuma informação pessoal sua será repassada na denúncia. 
          A identificação do CRO é necessária apenas para garantir que a área de denúncia 
          seja disponibilizada exclusivamente para profissionais cadastrados.
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="state" className="form-label">Estado do CRO:</label>
            <select
              id="state"
              className="form-input"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="">Selecione o estado</option>
              <option value="PB">Paraíba</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cro" className="form-label">Número do CRO:</label>
            <input
              type="text"
              id="cro"
              className="form-input"
              value={croNumber}
              onChange={(e) => setCroNumber(e.target.value)}
              placeholder="Digite apenas números"
              required
            />
            <p className="form-helper">Exemplo: Para CRO-PB 12345, digite apenas 12345</p>
          </div>

          <div className="button-group">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-submit">
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
