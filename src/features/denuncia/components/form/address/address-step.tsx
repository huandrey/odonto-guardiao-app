import React from 'react';

import { Address } from '../../../types/denuncia';
import { AddressController } from './address-controller';
import { validateAddressStep } from './address-step-validation';
import { DenunciaController } from '../../../denuncia-controller';
import { CustomSelect } from '../../../../../shared/components/select';
import { formatarCEP } from '../../../../../shared/utils/string-utils';

import './address-step.css';

interface ValidationErrors {
  cep?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
}

interface TouchedFields {
  cep?: boolean;
  street?: boolean;
  number?: boolean;
  neighborhood?: boolean;
}

interface AddressStepProps {
  address: Address;
  onChange: (address: Address) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export const AddressStep: React.FC<AddressStepProps> = ({ address, onChange, onValidationChange }) => {
  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const [touchedFields, setTouchedFields] = React.useState<TouchedFields>({});
  const denunciaController = new DenunciaController();
  const addressController = new AddressController();

  const handleBlur = (field: keyof TouchedFields) => {
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));
  };
  const neighborhoods = denunciaController.getAllBairros();
  React.useEffect(() => {
    const validationErrors = validateAddressStep(address);
    const isValid = Object.keys(validationErrors).length === 0;

    setErrors(validationErrors);
    onValidationChange?.(isValid);
  }, [address]);

  React.useEffect(() => {
    if (!!address.cep && address.cep?.length >= 8) {
      addressController.getAddressByCep(address.cep)
        .then((addressData) => {
          if (addressData) {
            const conselho = denunciaController.findConselhoByBairro(addressData.bairro);
            onChange({
              ...address,
              street: addressData.logradouro,
              neighborhood: addressData.bairro,
              councilRegion: conselho ? {
                setor: conselho.setor,
                nome: conselho.nome,
                regiao: conselho.regiao || undefined,
                contato: conselho.contato
              } : undefined
            });
          }
        });
    }
  }, [address.cep])

  const handleNeighborhoodChange = (selectedNeighborhood: string) => {
    const conselho = denunciaController.findConselhoByBairro(selectedNeighborhood);

    onChange({
      ...address,
      neighborhood: selectedNeighborhood,
      councilRegion: conselho ? {
        setor: conselho.setor,
        nome: conselho.nome,
        contato: conselho.contato,
        regiao: conselho.regiao || undefined
      } : undefined
    });
  };

  return (
    <div className="address-step">
      <div className="form-group">
        <div className="address-form-item">
          <label>CEP</label>
          <div className="tooltip-container-base">
            <div className="info-icon-base"><span>i</span></div>
            <div className="tooltip-base">
              Caso a criança ou adolescente resida em outro município que não seja Campina Grande, deve-se informar o CEP do endereço onde a violência ocorreu, em Campina Grande.
            </div>
          </div>
        </div>
        <input
          type="text"
          value={address.cep || ''}
          onChange={(e) => onChange({ ...address, cep: formatarCEP(e.target.value) })}
          onBlur={() => handleBlur('cep')}
          placeholder="58000-000"
        />
        {touchedFields.cep && errors.cep && <span className="error-message">{errors.cep}</span>}
      </div>

      <div className="form-group">
        <label>Rua</label>
        <input
          type="text"
          value={address.street || ''}
          onChange={(e) => onChange({ ...address, street: e.target.value })}
          onBlur={() => handleBlur('street')}
          placeholder="Nome da rua"
        />
        {touchedFields.street && <span className="error-message">{errors.street}</span>}
      </div>

      <div className="form-group">
        <label>Número</label>
        <input
          type="text"
          value={address.number || ''}
          onChange={(e) => onChange({ ...address, number: e.target.value })}
          onBlur={() => handleBlur('number')}
          placeholder="Número"
        />
        {touchedFields.number && errors.number && <span className="error-message">{errors.number}</span>}
      </div>

      <div className="form-group">
        <CustomSelect
          label="Bairro"
          value={address.neighborhood || ''}
          onChange={handleNeighborhoodChange}
          options={neighborhoods}
          onBlur={() => handleBlur('neighborhood')}
          error={touchedFields.neighborhood && !!errors.neighborhood}
          placeholder="Selecione um bairro"
        />
        {touchedFields.neighborhood && errors.neighborhood && <span className="error-message">{errors.neighborhood}</span>}
      </div>
    </div>
  );
};
