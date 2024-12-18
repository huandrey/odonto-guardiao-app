import React from 'react';
import { AdditionalInfo } from '../../types/denuncia';
import './informacoes-adicionais.css';

interface VictimReportStepProps {
  additionalInfo: AdditionalInfo;
  onChange: (additionalInfo: AdditionalInfo) => void;
}

export const VictimReportStep: React.FC<VictimReportStepProps> = ({
  additionalInfo,
  onChange
}) => {
  return (
    <div className="additional-info-step">
      <h2>Relato da Vítima</h2>

      <div className="info-card">
        <textarea
          value={additionalInfo.victimReport || ''}
          onChange={(e) => onChange({
            ...additionalInfo,
            victimReport: e.target.value
          })}
          placeholder="Digite aqui o relato da vítima..."
          className="info-textarea"
        />
      </div>
    </div>
  );
};
