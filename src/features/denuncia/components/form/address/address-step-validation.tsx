import { Address } from "../../../types/denuncia";

export interface AddressValidationErrors {
  cep?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
}

export const ADDRESS_VALIDATION_MESSAGES = {
  REQUIRED_CEP: 'CEP é obrigatório',
  INVALID_CEP: 'CEP inválido',
  REQUIRED_STREET: 'Rua é obrigatória',
  INVALID_STREET: 'Rua deve ter pelo menos 3 caracteres',
  REQUIRED_NUMBER: 'Número é obrigatório',
  REQUIRED_NEIGHBORHOOD: 'Bairro é obrigatório'
} as const;

export const validateAddressStep = (address: Address): AddressValidationErrors => {
  const errors: AddressValidationErrors = {};
  if (!!address.cep && !/^\d{5}-?\d{3}$/.test(address.cep)) {
    errors.cep = ADDRESS_VALIDATION_MESSAGES.INVALID_CEP;
  }
  if (!address.street?.trim()) {
    errors.street = 'Rua é obrigatória';
  } else if (address.street.length < 3) {
    errors.street = ADDRESS_VALIDATION_MESSAGES.INVALID_STREET;
  }
  if (!address.number?.trim()) {
    errors.number = ADDRESS_VALIDATION_MESSAGES.REQUIRED_NUMBER;
  }
  if (!address.neighborhood?.trim()) {
    errors.neighborhood = ADDRESS_VALIDATION_MESSAGES.REQUIRED_NEIGHBORHOOD;
  }

  return errors;
};

export const isAddressValid = (address: Address): boolean => {
  const errors = validateAddressStep(address);
  return Object.keys(errors).length === 0;
};
