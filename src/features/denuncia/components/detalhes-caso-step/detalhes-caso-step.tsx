import React from 'react';
import { CaseDetails, InjuryLocation } from '../../types/denuncia';
import './detalhes-caso-step.css'
import jsPDF from 'jspdf';
import { Info } from 'lucide';

interface CaseDetailsStepProps {
  caseDetails: CaseDetails;
  onChange: (caseDetails: CaseDetails) => void;
}

const LocationSelector: React.FC<{
  location?: InjuryLocation;
  onChange: (location: InjuryLocation) => void;
}> = ({ location = { 'Cabeça': false, 'Face': false, 'Pescoço': false }, onChange }) => (
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

export const CaseDetailsStep: React.FC<CaseDetailsStepProps> = ({
  caseDetails,
  onChange,
}) => {
  const [expanded, setExpanded] = React.useState<string | null>(null);

  const handleBooleanChange =
    (field: keyof CaseDetails) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const isYes = e.target.checked;
        const update: Partial<CaseDetails> = { [field]: isYes };
        if (!isYes) {
          update[`${field}Location` as keyof CaseDetails] = undefined;
        }
        onChange({ ...caseDetails, ...update });
      };

  const toggleAccordion = (section: string) =>
    setExpanded(expanded === section ? null : section);

  const renderSwitchQuestion = (
    field: keyof CaseDetails,
    question: string,
    info?: string,
    hasLocation?: boolean
  ) => (
    <div className="form-card">
      <div className="form-card-header">
        <span className="question-text">{question}</span>
        {info && (
          <div className="tooltip-container">
            <span className="info-icon">i</span>
            <div className="tooltip">{info}</div>
          </div>
        )}
      </div>
      <div className="form-card-content">
        <label className="switch">
          <input
            type="checkbox"
            checked={caseDetails[field] === true}
            onChange={handleBooleanChange(field)}
          />
          <span className="slider round"></span>
        </label>
      </div>
      {/* {hasLocation && caseDetails[field] && (
        <LocationSelector
          location={
            caseDetails[`${field}Location` as keyof CaseDetails] as InjuryLocation
          }
          onChange={(location) =>
            onChange({ ...caseDetails, [`${field}Location`]: location })
          }
        />
      )} */}
    </div>
  );







  // Foi identificada alguma Laceração? Colocar algum texto explicativo do que é laceração. Se a resposta for sim, novas opções devem aparecer para o usuário escolher -> Cabeça, Face e Pescoço.

  // Havia sinal de Queimadura? Se a resposta for sim, novas opções devem aparecer para o usuário escolher -> Cabeça, Face e Pescoço.

  // Havia alguma marca de Mordida? Se a resposta for sim, novas opções devem aparecer para o usuário escolher -> Cabeça, Face e Pescoço.

  // Alguma Laceração no Freio Labial? Colocar algum texto explicativo do que é

  // Alguma Laceração no Freio Lingual? Colocar algum texto explicativo do que é

  // Foi identificado algum Trauma no palato?

  // Foi identificado algum Trauma dental?
  return (
    <div className="case-details-step">
      <h2>Detalhes do Caso</h2>
      <br />
      <div className="accordion">
        <div className="accordion-item">
          <div
            className="accordion-header"
            onClick={() => toggleAccordion('lesoes-gerais')}
          >
            Lesões Gerais
          </div>
          {expanded === 'lesoes-gerais' && (
            <div className="accordion-content">
              {renderSwitchQuestion('hasAggressionSigns', 'Foi identificado algum sinal de agressão?')}
              <br />
              {renderSwitchQuestion('hasEyeInjury', 'Foi identificada alguma lesão no olho?')}
            </div>
          )}
        </div>

        <div className="accordion-item">
          <div
            className="accordion-header"
            onClick={() => toggleAccordion('lesoes-visiveis')}
          >
            Lesões Visíveis
          </div>
          {expanded === 'lesoes-visiveis' && (
            <div className="accordion-content">
              {renderSwitchQuestion(
                'hasBruises',
                'A vítima possui/possuía algum hematoma visível?',
                // undefined,
                // true
              )}
              <br />
              {renderSwitchQuestion(
                'hasAbrasion',
                'Foi identificada alguma Abrasão?',
                // 'Lesão superficial da pele causada por atrito.',
              )}
              <br />
              {renderSwitchQuestion(
                'hasLaceration',
                'Foi identificada alguma Laceração?',
                // 'Corte ou rasgamento do tecido.',
                // true
              )}
            </div>
          )}
        </div>

        <div className="accordion-item">
          <div
            className="accordion-header"
            onClick={() => toggleAccordion('lesoes-graves')}
          >
            Lesões Graves
          </div>
          {expanded === 'lesoes-graves' && (
            <div className="accordion-content">
              {renderSwitchQuestion('hasBurns', 'Havia sinal de queimadura?')}
              <br />
              {renderSwitchQuestion('hasBiteMarks', 'Havia alguma marca de Mordida?',)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
