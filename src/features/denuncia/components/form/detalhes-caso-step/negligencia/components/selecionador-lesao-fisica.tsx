import React from 'react'
import { InjuryLocation } from '../../../../../types/denuncia'

import './selecionador-local-lesao-fisica.css'

export const SelecionadorLocalLesaoFisica: React.FC<{
  location?: InjuryLocation;
  onChange: (location: InjuryLocation) => void;
}> = ({
  location = {
    "Cabeça": false,
    "Face": false,
    "Pescoço": false,
    "Outro": false
  },
  onChange,
}) => (
    <div className="location-selector">
      <p>Selecione a localização:</p>
      <div className="location-checkboxes">
        {Object.entries(location).map(([key, checked]) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => {
                onChange({ ...location, [key]: e.target.checked })
              }}
            />
            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          </label>
        ))}
      </div>
    </div>
  );
