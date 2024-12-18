import React from 'react';
import { Complaint } from '../types/denuncia';
import { AddressStep } from './address-step/address-step';
import { VictimDataStep } from './dados-vitima-step/dados-vitima-step';
import { GeneralInjuriesStep } from './detalhes-caso-step/lesoes-gerais';
import { VisibleInjuriesStep } from './detalhes-caso-step/lesoes-visiveis';
import { SevereInjuriesStep } from './detalhes-caso-step/lesoes-graves';
import { ExtraInfoStep } from './informacoes-adicionais-step/informacoes-adicionais';
import { ComplaintSummary } from './resumo-denuncia/resumo-denuncia';

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
    3: <GeneralInjuriesStep
      caseDetails={complaint.caseDetails}
      onChange={(caseDetails) => onComplaintUpdate('caseDetails', caseDetails)}
      onValidationChange={onValidationChange}
    />,
    4: <VisibleInjuriesStep
      caseDetails={complaint.caseDetails}
      onChange={(caseDetails) => onComplaintUpdate('caseDetails', caseDetails)}
      onValidationChange={onValidationChange}
    />,
    5: <SevereInjuriesStep
      caseDetails={complaint.caseDetails}
      onChange={(caseDetails) => onComplaintUpdate('caseDetails', caseDetails)}
      onValidationChange={onValidationChange}
    />,
    6: <ExtraInfoStep
      additionalInfo={complaint.additionalInfo}
      onChange={(additionalInfo) => onComplaintUpdate('additionalInfo', additionalInfo)}
      onValidationChange={onValidationChange}
    />,
    7: <ComplaintSummary 
      complaint={complaint} 
      onChange={() => { }} 
      onValidationChange={onValidationChange}
      />,
  };

  return steps[currentStep as keyof typeof steps] || null;
};
