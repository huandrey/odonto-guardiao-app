import React from "react";
import './modal.css';

interface ModalProps {
  title: string;
  warning?: string;
  onPrimary: () => void;
  onSecondary: () => void;
  primaryLabel: string;
  secondayLabel?: string;
}

export const Modal: React.FC<ModalProps> = ({ title, primaryLabel, warning, secondayLabel = 'Sair mesmo assim', onPrimary, onSecondary }: ModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        { warning && <p className="warning">{warning}</p>}
        <div className="modal-button-content">
          <button className="modal-button" onClick={onPrimary}>
            {primaryLabel}
          </button>
          <button className="modal-close secondary" onClick={onSecondary}>
           {secondayLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
