import React, { useState } from 'react'
import { InjuryLocation } from '../../../../../types/denuncia'

import './selecionador-local-lesao-fisica.css'

export const SelecionadorLocalLesaoFisica: React.FC<{
  location?: InjuryLocation;
  onChange: (location: InjuryLocation) => void;
  addOtherField: (otherField: string) => void;
}> = ({
  location = {
    "Cabeça": false,
    "Face": false,
    "Pescoço": false,
    "Outro": false
  },
  onChange,
  addOtherField,
}) => {
    const [otherField, setOtherField] = useState('')

    const onChangeOtherField = (e: React.ChangeEvent<HTMLInputElement>) => {
      setOtherField(e.target.value)
    }


    return (
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
              <span>{key.charAt(0).toUpperCase() + key.slice(1) + (key === "Outro" ? ':' : '')}</span>

              {key === "Outro" && (
                <div id="other-field">
                  <input
                    id="name"
                    type="text"
                    value={otherField}
                    onChange={(e) => {
                      onChangeOtherField(e)
                      addOtherField(e.target.value)
                    }}
                  />
                </div>)}
            </label>
          ))}
        </div>
      </div>
    )
  };
