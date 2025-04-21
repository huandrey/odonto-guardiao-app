import React from 'react';
import { Complaint } from '../../types/denuncia';
import { AddressStep } from '../form/address/address-step';
import { VictimDataStep } from '../form/dados-vitima/dados-vitima-step';
import { VisibleInjuriesStep } from '../form/detalhes-caso-step/lesoes-visiveis';
import { SevereInjuriesStep } from './detalhes-caso-step/outras-lesoes-fisicas/outras-lesoes-fisicas-page';
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
    4: <SevereInjuriesStep
      caseDetails={complaint.caseDetails}
      onChange={(caseDetails) => onComplaintUpdate('caseDetails', caseDetails)}
    />,
    5: <ExtraInfoStep
      additionalInfo={complaint.additionalInfo}
      onChange={(additionalInfo) => onComplaintUpdate('additionalInfo', additionalInfo)}
    />,
    6: <ComplaintSummary complaint={complaint} />
  };

  return steps[currentStep as keyof typeof steps] || null;
};
