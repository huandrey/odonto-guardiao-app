import React from 'react';
import { CaseDetails } from '../../types/denuncia';
import './lesoes.css';

interface GeneralInjuriesStepProps {
  caseDetails: CaseDetails;
  onChange: (caseDetails: CaseDetails) => void;
  onValidationChange?: (isValid: boolean) => void; // Nova prop
}

export const GeneralInjuriesStep: React.FC<GeneralInjuriesStepProps> = ({
  caseDetails,
  onChange,
}) => {
  const handleBooleanChange =
    (field: keyof CaseDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const isYes = e.target.checked;
      onChange({ ...caseDetails, [field]: isYes });
    };

  return (
    <div className="injuries-step">
      <h2>Lesões Gerais</h2>
      <div className="questions-container">
        <div className="form-card">
          <div className="form-card-header">
            <span className="question-text">Sinais de Agressão?</span>
          </div>
          <div className="form-card-content">
            <label className="switch">
              <input
                type="checkbox"
                checked={caseDetails.hasAggressionSigns}
                onChange={handleBooleanChange('hasAggressionSigns')}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <div className="form-card">
          <div className="form-card-header">
            <span className="question-text">Lesão no Olho?</span>
          </div>
          <div className="form-card-content">
            <label className="switch">
              <input
                type="checkbox"
                checked={caseDetails.hasEyeInjury}
                onChange={handleBooleanChange('hasEyeInjury')}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
