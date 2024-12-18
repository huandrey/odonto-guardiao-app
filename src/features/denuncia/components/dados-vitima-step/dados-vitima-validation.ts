import { VictimData } from "../../types/denuncia";

export interface VictimDataValidationErrors {
  name?: string;
  birthDate?: string;
  gender?: string;
}

export const DADOS_VITIMA_VALIDATION_MESSAGES = {
  INVALID_NAME_EMPTY: 'Nome da vítima é obrigatório',
  INVALID_NOME_LENGTH: 'Nome deve ter pelo menos 3 caracteres',
  INVALID_BIRTH_DATE: 'Data de nascimento é obrigatória',
  INVALID_FUTURE_BIRTH_DATE: 'Data de nascimento não pode ser futura',
  INVALID_GENERO_EMPTY: 'Gênero é obrigatório',
  INVALID_GENERO: 'Gênero inválido',
} as const;

export const validateVictimDataStep = (victimData: VictimData): VictimDataValidationErrors => {
  const errors: VictimDataValidationErrors = {};

  if (!victimData.name?.trim()) {
    errors.name = DADOS_VITIMA_VALIDATION_MESSAGES.INVALID_NAME_EMPTY;
  } else if (victimData.name.trim().length < 3) {
    errors.name = DADOS_VITIMA_VALIDATION_MESSAGES.INVALID_NOME_LENGTH;
  }

  if (!victimData.birthDate) {
    errors.birthDate = DADOS_VITIMA_VALIDATION_MESSAGES.INVALID_BIRTH_DATE;
  } else {
    const birthDate = new Date(victimData.birthDate);
    const today = new Date();
    
    if (birthDate > today) {
      errors.birthDate = DADOS_VITIMA_VALIDATION_MESSAGES.INVALID_FUTURE_BIRTH_DATE;
    }
  }

  if (!victimData.gender) {
    errors.gender = DADOS_VITIMA_VALIDATION_MESSAGES.INVALID_GENERO_EMPTY
  } else if (!['male', 'female', 'other'].includes(victimData.gender)) {
    errors.gender = DADOS_VITIMA_VALIDATION_MESSAGES.INVALID_GENERO;
  }

  return errors;
};

export const isVictimDataValid = (victimData: VictimData): boolean => {
  const errors = validateVictimDataStep(victimData);
  return Object.keys(errors).length === 0;
};
