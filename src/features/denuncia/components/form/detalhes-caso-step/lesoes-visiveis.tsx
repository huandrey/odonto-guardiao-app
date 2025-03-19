import React from 'react';
import './lesoes.css';
import { CaseDetails, InjuryLocation } from '../../../types/denuncia';

interface VisibleInjuriesStepProps {
  caseDetails: CaseDetails;
  onChange: (caseDetails: CaseDetails) => void;
  onValidationChange?: (isValid: boolean) => void; // Nova prop
}

const LocationSelector: React.FC<{
  location?: InjuryLocation;
  onChange: (location: InjuryLocation) => void;
}> = ({ location = { "Cabeça": false, "Face": false, "Pescoço": false }, onChange }) => (
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

export const VisibleInjuriesStep: React.FC<VisibleInjuriesStepProps> = ({
  caseDetails,
  onChange,
}) => {
  const updateCaseDetails = (updates: Partial<CaseDetails>) => {
    onChange({
      ...caseDetails,
      ...updates
    });
  };
  
  const handleBooleanChange =
    (field: keyof CaseDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const isYes = e.target.checked;
      const updates: Partial<CaseDetails> = { [field]: isYes };

      if (!isYes) {
        updates[`${field}Location` as keyof CaseDetails] = undefined;
      }

      updateCaseDetails(updates);
    };

    // const handleBooleanChange =
    // (field: keyof CaseDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const isYes = e.target.checked;
    //   onChange({ ...caseDetails, [field]: isYes });
    // };


  return (
    <div className="injuries-step">
      <h2>Lesões Visíveis</h2>
      <div className="questions-container">
      <div className="form-card">
          <div className="form-card-header">
            <span className="question-text">Sinais de Agressão Física?</span>
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
            <span className="question-text">Hematoma?</span>
            <div className="tooltip-container">
              <span className="info-icon">i</span>
              <div className="tooltip">
                Acúmulo de sangue em um tecido devido à lesão de vasos sanguíneos.
              </div>
            </div>
          </div>
          <div className="form-card-content">
            <label className="switch">
              <input
                type="checkbox"
                checked={caseDetails.hasBruises}
                onChange={handleBooleanChange('hasBruises')}
              />
              <span className="slider round"></span>
            </label>
            {caseDetails.hasBruises && (
              <LocationSelector
                location={caseDetails.bruisesLocation}
                onChange={(location) =>
                  onChange({ ...caseDetails, bruisesLocation: location })
                }
              />
            )}
          </div>
        </div>

        <div className="form-card">
          <div className="form-card-header">
            <span className="question-text">Abrasão?</span>
            <div className="tooltip-container">
              <span className="info-icon">i</span>
              <div className="tooltip">
                Ferida superficial, normalmente apenas com perda de pele, resultante de uma queda, ou de um arrastão pelo chão, ou por outra superfície.
              </div>
            </div>
          </div>
          <div className="form-card-content">
            <label className="switch">
              <input
                type="checkbox"
                checked={caseDetails.hasAbrasion}
                onChange={handleBooleanChange('hasAbrasion')}
              />
              <span className="slider round"></span>
            </label>
            {caseDetails.hasAbrasion && (
              <LocationSelector
                location={caseDetails.abrasionLocation}
                onChange={(location) =>
                  onChange({ ...caseDetails, abrasionLocation: location })
                }
              />
            )}
          </div>
        </div>

        <div className="form-card">
          <div className="form-card-header">
            <span className="question-text">Laceração?</span>
            <div className="tooltip-container">
              <span className="info-icon">i</span>
              <div className="tooltip">
                Ruptura nos tecidos moles do corpo.
              </div>
            </div>
          </div>
          <div className="form-card-content">
            <label className="switch">
              <input
                type="checkbox"
                checked={caseDetails.hasLaceration}
                onChange={handleBooleanChange('hasLaceration')}
              />
              <span className="slider round"></span>
            </label>
            {caseDetails.hasLaceration && (
              <LocationSelector
                location={caseDetails.lacerationLocation}
                onChange={(location) =>
                  onChange({ ...caseDetails, lacerationLocation: location })
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
