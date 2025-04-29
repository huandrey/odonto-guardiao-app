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
  INVALID_BIRTH_DATE_DAY: 'Dia inválido',
  INVALID_BIRTH_DATE_MONTH: 'Mês inválido',
  INVALID_BIRTH_DATE_YEAR: 'Ano inválido',
  INVALID_GENERO_EMPTY: 'Gênero é obrigatório',
  INVALID_GENERO: 'Gênero inválido',
} as const;

export const validateVictimDataStep = (victimData: VictimDataValidationErrors): VictimDataValidationErrors => {
  const errors: VictimDataValidationErrors = {};

  if (!victimData.name?.trim()) {
    errors.name = DADOS_VITIMA_VALIDATION_MESSAGES.INVALID_NAME_EMPTY;
  } else if (victimData.name.trim().length < 3) {
    errors.name = DADOS_VITIMA_VALIDATION_MESSAGES.INVALID_NOME_LENGTH;
  }

  if (!victimData.birthDate) {
    errors.birthDate = DADOS_VITIMA_VALIDATION_MESSAGES.INVALID_BIRTH_DATE;
  } else {

    if (victimData.birthDate.length === 10) {
      const [dayStr, monthStr, yearStr] = victimData.birthDate.split('/');
      const day = parseInt(dayStr, 10);
      const month = parseInt(monthStr, 10);
      const year = parseInt(yearStr, 10);
      const currentYear = new Date().getFullYear();

      if (day > 31 || day === 0) {
        errors.birthDate = DADOS_VITIMA_VALIDATION_MESSAGES.INVALID_BIRTH_DATE_DAY;
        console.error('Dia inválido:', day);
      }

      if (month > 12 || month === 0) {
        errors.birthDate = DADOS_VITIMA_VALIDATION_MESSAGES.INVALID_BIRTH_DATE_MONTH;
        console.error('Mês inválido:', month);
      }

      if (year > currentYear || year === 0) {
        errors.birthDate = DADOS_VITIMA_VALIDATION_MESSAGES.INVALID_BIRTH_DATE_YEAR;
        console.error('Ano inválido:', year);
      }
    }
    
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

export const isVictimDataValid = (victimData: VictimDataValidationErrors): boolean => {
  const errors = validateVictimDataStep(victimData);
  return Object.keys(errors).length === 0;
};
