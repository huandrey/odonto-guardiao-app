import React from 'react';
import './modal_feedback.css';

interface FeedbackModalProps {
  isSuccess: boolean;
  message: string;
  onClose: () => void;
  onRedirect: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isSuccess,
  message,
  onClose,
  onRedirect
}) => {
  return (
    <div className="modal-overlay">
      <div className="feedback-modal">
        <div className={`modal-icon ${isSuccess ? 'success' : 'error'}`}>
          {isSuccess ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 6L9 17L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6L18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        <h3>{isSuccess ? 'Sucesso!' : 'Erro'}</h3>
        <p>{message}</p>

        <div className="modal-buttons">
          {isSuccess ? (
            <button
              className="button button-primary"
              onClick={onRedirect}
            >
              Voltar ao Início
            </button>
          ) : (
            <>
              <button
                className="button button-secondary"
                onClick={onClose}
              >
                Tentar Novamente
              </button>
              <button
                className="button button-primary"
                onClick={onRedirect}
              >
                Voltar ao Início
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
