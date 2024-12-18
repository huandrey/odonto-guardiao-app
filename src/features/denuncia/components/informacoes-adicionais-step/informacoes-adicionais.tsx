import React from 'react';
import { AdditionalInfo } from '../../types/denuncia';
import './informacoes-adicionais.css';

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
      <h2>Informações Extras sobre o Caso</h2>

      <div className="info-card">
        <p className="info-description">
          Você possui mais informações sobre o caso? Toda informação será considerada como importante.
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
