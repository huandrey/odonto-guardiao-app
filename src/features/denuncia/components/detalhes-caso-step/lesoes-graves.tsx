import React from 'react';
import { CaseDetails, InjuryLocation } from '../../types/denuncia';
import './lesoes.css';

interface SevereInjuriesStepProps {
  caseDetails: CaseDetails;
  onChange: (caseDetails: CaseDetails) => void;
  onValidationChange?: (isValid: boolean) => void; // Nova prop
}

const LocationSelector: React.FC<{
  location?: InjuryLocation;
  onChange: (location: InjuryLocation) => void;
}> = ({ location = { "Cabeça": false, "Rosto": false, "Pescoço": false }, onChange }) => (
  <div className="location-selector">
    <p>Selecione a localização:</p>
    <div className="location-checkboxes">
      {Object.entries(location).map(([key, checked]) => (
        <label key={key}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange({ ...location, [key]: e.target.checked })}
          />
          <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
        </label>
      ))}
    </div>
  </div>
);

export const SevereInjuriesStep: React.FC<SevereInjuriesStepProps> = ({
  caseDetails,
  onChange,
}) => {
  const handleBooleanChange =
    (field: keyof CaseDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const isYes = e.target.checked;
      const update: Partial<CaseDetails> = { [field]: isYes };

      if (!isYes) {
        update[`${field}Location` as keyof CaseDetails] = undefined;
      }

      onChange({ ...caseDetails, ...update });
    };

  return (
    <div className="injuries-step">
      <h2>Lesões Graves</h2>
      <div className="questions-container">
        <div className="form-card">
          <div className="form-card-header">
            <span className="question-text">Queimadura?</span>
            <div className="tooltip-container">
              <span className="info-icon">i</span>
              <div className="tooltip">
                Toda lesão provocada pelo contato direto com alguma fonte de calor ou frio, produtos químicos, corrente elétrica, radiação, ou mesmo alguns animais e plantas (como larvas, água-viva, urtiga), entre outros.
              </div>
            </div>
          </div>
          <div className="form-card-content">
            <label className="switch">
              <input
                type="checkbox"
                checked={caseDetails.hasBurns}
                onChange={handleBooleanChange('hasBurns')}
              />
              <span className="slider round"></span>
            </label>
            {caseDetails.hasBurns && (
              <LocationSelector
                location={caseDetails.burnsLocation}
                onChange={(location) =>
                  onChange({ ...caseDetails, burnsLocation: location })
                }
              />
            )}
          </div>
        </div>

        <div className="form-card">
          <div className="form-card-header">
            <span className="question-text">Marca de Mordida?</span>
          </div>
          <div className="form-card-content">
            <label className="switch">
              <input
                type="checkbox"
                checked={caseDetails.hasBiteMarks}
                onChange={handleBooleanChange('hasBiteMarks')}
              />
              <span className="slider round"></span>
            </label>
            {caseDetails.hasBiteMarks && (
              <LocationSelector
                location={caseDetails.biteMarksLocation}
                onChange={(location) =>
                  onChange({ ...caseDetails, biteMarksLocation: location })
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
