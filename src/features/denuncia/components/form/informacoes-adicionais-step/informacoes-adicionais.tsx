import React from 'react';
import './informacoes-adicionais.css';
import { AdditionalInfo } from '../../../types/denuncia';

interface ExtraInfoStepProps {
  additionalInfo: AdditionalInfo;
  onChange: (additionalInfo: AdditionalInfo) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export const ExtraInfoStep: React.FC<ExtraInfoStepProps> = ({
  additionalInfo,
  onChange
}) => {
  return (
    <div className="additional-info-step">
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
          placeholder="Aqui você pode acrescentar detalhes sobres os sinais físicos (onde e como se apresentam), e também suas percepções sobre o comportamento da criança e do adolescente."
          className="info-textarea"
        />
      </div>
    </div>
  );
};
