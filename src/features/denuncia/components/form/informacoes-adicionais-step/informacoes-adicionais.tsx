import React from 'react';
import './informacoes-adicionais.css';
import { AdditionalInfo } from '../../../types/denuncia';

interface ExtraInfoStepProps {
  additionalInfo: AdditionalInfo;
  onChange: (additionalInfo: AdditionalInfo) => void;
  onValidationChange?: (isValid: boolean) => void; // Nova prop
}

export const ExtraInfoStep: React.FC<ExtraInfoStepProps> = ({
  additionalInfo,
  onChange
}) => {
  return (
    <div className="additional-info-step">
      <h2>Informações Extras</h2>

      <div className="info-card">
        <p className="info-description">
          Você tem mais detalhes sobre o caso? Toda informação é relevante.
        </p>

        <textarea
          value={additionalInfo.extraInformation || ''}
          onChange={(e) => onChange({
            ...additionalInfo,
            extraInformation: e.target.value
          })}
          placeholder="Descreva aqui informações adicionais sobre o caso..."
          className="info-textarea"
        />
      </div>
    </div>
  );
};
