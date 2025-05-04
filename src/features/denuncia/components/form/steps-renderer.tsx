import React from 'react';
import { Complaint } from '../../types/denuncia';
import { AddressStep } from '../form/address/address-step';
import { VictimDataStep } from '../form/dados-vitima/dados-vitima-step';
import { VisibleInjuriesStep } from '../form/detalhes-caso-step/lesoes-visiveis';
import { NegligenciaPsicologicaStep } from './detalhes-caso-step/negligencia/negligencia-page';
import { ViolenciaPsicologicaStep } from './detalhes-caso-step/violencia-psicologica/violencia-psicologica-page';
import { ExtraInfoStep } from '../form/informacoes-adicionais-step/informacoes-adicionais';
import { ComplaintSummary } from '../form/resumo-denuncia/resumo-denuncia';

interface StepsRendererProps {
  currentStep: number;
  complaint: Complaint;
  onComplaintUpdate: (field: keyof Complaint, value: unknown) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const StepsRenderer: React.FC<StepsRendererProps> = ({
  currentStep,
  complaint,
  onComplaintUpdate,
  onValidationChange
}) => {
  const steps = {
    1: <AddressStep
      address={complaint.address}
      onChange={(address) => onComplaintUpdate('address', address)}
      onValidationChange={onValidationChange}
    />,
    2: <VictimDataStep
      victimData={complaint.victimData}
      onChange={(victimData) => onComplaintUpdate('victimData', victimData)}
      onValidationChange={onValidationChange}
    />,
    3: <VisibleInjuriesStep
      caseDetails={complaint.caseDetails}
      onChange={(caseDetails) => onComplaintUpdate('caseDetails', caseDetails)}
    />,
    4: <NegligenciaPsicologicaStep
      caseDetails={complaint.caseDetails}
      onChange={(caseDetails) => onComplaintUpdate('caseDetails', caseDetails)}
    />,
    5: <ViolenciaPsicologicaStep
      caseDetails={complaint.caseDetails}
      onChange={(caseDetails) => onComplaintUpdate('caseDetails', caseDetails)}
    />,
    6: <ExtraInfoStep
      additionalInfo={complaint.additionalInfo}
      onChange={(additionalInfo) => onComplaintUpdate('additionalInfo', additionalInfo)}
    />,
    7: <ComplaintSummary complaint={complaint} />
  };

  return steps[currentStep as keyof typeof steps] || null;
};
