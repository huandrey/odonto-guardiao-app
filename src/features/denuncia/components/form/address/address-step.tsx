import React from 'react';
import './address-step.css';
import { validateAddressStep } from './address-step-validation';
import { Address } from '../../../types/denuncia';
import { CustomSelect } from '../../../../../shared/components/select';
import { DenunciaController } from '../../../denuncia-controller';
import { AddressController } from './address-controller';
import { formatarCEP } from '../../../../../shared/utils/string-utils';

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
  onValidationChange?: (isValid: boolean) => void; // Nova prop
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
            onChange({
              ...address,
              street: addressData.logradouro,
              neighborhood: addressData.bairro,
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
        contato: conselho.contato
      } : undefined
    });
  };

  return (
    <div className="address-step">
      <h2>Endereço da Vítima</h2>
      <br />
      <div className="form-group">
        <label>CEP</label>
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
