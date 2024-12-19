import React from 'react';
import { Complaint } from '../../types/denuncia';
import { AddressStep } from '../form/address/address-step';
import { VictimDataStep } from '../form/dados-vitima/dados-vitima-step';
import { GeneralInjuriesStep } from '../form/detalhes-caso-step/lesoes-gerais';
import { VisibleInjuriesStep } from '../form/detalhes-caso-step/lesoes-visiveis';
import { SevereInjuriesStep } from '../form/detalhes-caso-step/lesoes-graves';
import { ExtraInfoStep } from '../form/informacoes-adicionais-step/informacoes-adicionais';
import { ComplaintSummary } from '../form/resumo-denuncia/resumo-denuncia';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleSubmitAndNavigate = async () => {
    try {
      // await handleSubmitComplaint();
      navigate('/confirmacao-denuncia', { 
        state: { 
          complaint,
          protocol: `DEN-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`
        } 
      });
    } catch (error) {
      // Tratar erro se necessário
      console.error('Erro ao enviar denúncia:', error);
    }
  };
  
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
    />,
    4: <VisibleInjuriesStep
      caseDetails={complaint.caseDetails}
      onChange={(caseDetails) => onComplaintUpdate('caseDetails', caseDetails)}
    />,
    5: <SevereInjuriesStep
      caseDetails={complaint.caseDetails}
      onChange={(caseDetails) => onComplaintUpdate('caseDetails', caseDetails)}
    />,
    6: <ExtraInfoStep
      additionalInfo={complaint.additionalInfo}
      onChange={(additionalInfo) => onComplaintUpdate('additionalInfo', additionalInfo)}
    />,
    7: <ComplaintSummary 
      complaint={complaint} 
      onChange={handleSubmitAndNavigate} 
      />,
  };

  return steps[currentStep as keyof typeof steps] || null;
};
