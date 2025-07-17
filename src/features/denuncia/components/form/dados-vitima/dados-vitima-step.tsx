import React from 'react';
import './dados-vitima-step.css';
import { validateVictimDataStep, VictimDataValidationErrors } from './dados-vitima-validation';
import { VictimData } from '../../../types/denuncia';

interface VictimDataStepProps {
  victimData: VictimData;
  onChange: (victimData: VictimData) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export const VictimDataStep: React.FC<VictimDataStepProps> = ({
  victimData,
  onChange,
  onValidationChange,
}) => {
  const [errors, setErrors] = React.useState<VictimDataValidationErrors>({});
  const [touchedFields, setTouchedFields] = React.useState({
    name: false,
    birthDate: false,
    gender: false
  });

  const handleBlur = (field: keyof typeof touchedFields) => {
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));
  };

  React.useEffect(() => {
    const validationErrors = validateVictimDataStep(victimData);
    const isValid = Object.keys(validationErrors).length === 0;

    setErrors(validationErrors);
    onValidationChange?.(isValid);
  }, [victimData]);

  const formatDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }

    return value;
  }

  const onChangeBirthDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatDate(e)
    onChange({ ...victimData, birthDate: value });
  }

  return (
    <div className="victim-data-step">
      <div className="form-group">
        <label htmlFor="name">Nome da Vítima</label>
        <input
          id="name"
          type="text"
          value={victimData.name}
          onChange={(e) => onChange({ ...victimData, name: e.target.value })}
          placeholder="Digite o nome completo"
        />
        {touchedFields.name && errors.name && (
          <span className="error-message">{errors.name}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="birthDate">Data de Nascimento</label>
        <input id="birthDate" type="text" placeholder='dd/mm/aaaa' value={victimData.birthDate} onChange={onChangeBirthDate} />

        {touchedFields.birthDate && errors.birthDate && (
          <span className="error-message">{errors.birthDate}</span>
        )}
      </div>

      <div className="form-group">
        <label>Sexo</label>
        <div className="radio-group">
          <div className="radio-option">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={victimData.gender === 'male'}
              onChange={(e) => {
                onChange({ ...victimData, gender: e.target.value as 'male' | 'female' | 'other' })
                handleBlur('gender');
              }}
            />
            <label htmlFor="male">Masculino</label>
          </div>

          <div className="radio-option">
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={victimData.gender === 'female'}
              onChange={(e) => {
                onChange({ ...victimData, gender: e.target.value as 'male' | 'female' | 'other' })
                handleBlur('gender');
              }}
            />
            <label htmlFor="female">Feminino</label>
          </div>

          <div className="radio-option">
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              checked={victimData.gender === 'other'}
              onChange={(e) => {
                onChange({ ...victimData, gender: e.target.value as 'male' | 'female' | 'other' })
                handleBlur('gender');
              }}
            />
            <label htmlFor="other">Outro</label>
          </div>
        </div>
        {touchedFields.gender && errors.gender && (
          <span className="error-message">{errors.gender}</span>
        )}
      </div>
    </div>
  );
};
