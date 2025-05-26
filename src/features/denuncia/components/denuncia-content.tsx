import React, { useEffect, useState } from 'react';

import './denuncia-content.css';

import { useNavigate } from 'react-router-dom';
import { useComplaintForm } from '../hooks/use-denuncia-form';
import { useStepsValidation } from '../hooks/use-step-validation';
import { useStepsNavigation } from '../hooks/use-steps-navigation';
import { ProgressBar } from './progress-bar';
import { StepsRenderer } from './form/steps-renderer';
import { NavigationInferiorControl } from './navigation-inferior-control';
import { FeedbackModal } from './modal_feedback';
import { DenunciaController, DenunciaState } from '../denuncia-controller';
import { Header } from '../../../shared/components/header/components';
import { Step } from './progress-bar/components/step-indicator';
import { Modal } from '../../inicio/components/modal';
import { generatePDF } from '../../../shared/utils/generate-pdf';

export type StepValidation = {
  [key: number]: boolean;
};

export const ComplaintForm: React.FC = () => {
  const navigate = useNavigate();
  const totalSteps = 7;
  const { complaint, updateComplaint, setPdf, hasExistingComplaintData, clearStoredData } = useComplaintForm();
  const { stepsValidation, updateStepValidation } = useStepsValidation();
  const { currentStep, setCurrentStep, goToSpecificStep } = useStepsNavigation(totalSteps, stepsValidation);
  const [submitState, setSubmitState] = useState<DenunciaState>({ status: 'idle' });
  const [modalVisible, setModalVisible] = React.useState(false)

  const denunciaController = new DenunciaController();

  const isNextButtonDisabled = !stepsValidation[currentStep];

  const handleFinalStep = async () => {
    setSubmitState({ status: 'loading' });

    try {
      const pdfBlob = generatePDF(complaint);
      setPdf(pdfBlob!);

      const protocol = `DEN-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
      const result = await denunciaController.submitDenuncia(complaint, pdfBlob, protocol);
      setSubmitState(result);

      if (result.status === 'success' && result.protocol) {
        navigate('/confirmacao-denuncia', {
          state: {
            complaint,
            protocol: result.protocol,
            pdf: pdfBlob
          }
        });
      }
    } catch (error) {
      console.error(error)
      setSubmitState({
        status: 'error',
        message: 'Erro inesperado ao enviar denúncia.'
      });
    }
  };

  const renderSubmitButton = () => {
    switch (submitState.status) {
      case 'loading':
        return (
          <button className="submit-button loading" disabled>
            <span className="loading-spinner"></span>
            Enviando...
          </button>
        );
      case 'error':
        return (
          <button className="submit-button error" onClick={() => setSubmitState({ status: 'idle' })}>
            Tentar Novamente
          </button>
        );
      default:
        return (
          <button
            className="submit-button"
            onClick={handleFinalStep}
            disabled={isNextButtonDisabled}
          >
            Enviar Denúncia
          </button>
        );
    }
  };

  const steps: Step[] = [
    { number: 1, label: "Endereço da Vítima" },
    { number: 2, label: "Dados da Vítima" },
    { number: 3, label: "Lesões Visíveis" },
    { number: 4, label: "Negligência Familiar" },
    { number: 5, label: "Violência Psicológica" },
    { number: 6, label: "Informações Adicionais" },
    { number: 7, label: "Resumo" }
  ];

  const [showContinueModal, setShowContinueModal] = useState(false)

  useEffect(() => {
    if (hasExistingComplaintData()) {
      setShowContinueModal(true);
    }
  }, [])

  const [error, setError] = useState({
    hasError: false,
    step: -2
  });

  return (
    <>
      {showContinueModal && <Modal
        title="Você tem uma denúncia em aberto, retomar de onde parou?"
        primaryLabel="Sim, desejo continuar"
        secondayLabel='Não, começar uma nova denúncia'
        onPrimary={() => setShowContinueModal(false)}
        onSecondary={() => {
          clearStoredData()
          setShowContinueModal(false)
        }}
      />}
      {modalVisible && <Modal
        title="Você tem certeza que deseja sair?"
        primaryLabel="Não! Voltar para onde estava"
        onPrimary={() => setModalVisible(false)}
        onSecondary={() => navigate("/")}
      />}
      <Header>
        <Header.Left>
          <Header.BackButton onClick={() => setModalVisible(true)} />
        </Header.Left>

        <Header.Center>
          <Header.Title>{steps[currentStep - 1].label}</Header.Title>
        </Header.Center>

        <Header.Right>
          <></>
        </Header.Right>
      </Header>

      <div className="complaint-form">
        <br />
        <br />
        <br />
        <ProgressBar currentStep={currentStep} onTap={goToSpecificStep} stepsValidation={stepsValidation} error={error} setError={setError} />
        <div className="step-content">
          <StepsRenderer
            currentStep={currentStep}
            complaint={complaint}
            onComplaintUpdate={updateComplaint}
            onValidationChange={(isValid) => updateStepValidation(currentStep, isValid)}
          />
          <br />
          <NavigationInferiorControl
            totalSteps={totalSteps}
            currentStep={currentStep}
            setCurrentStep={(newStep) => {
              setError({
                step: -2,
                hasError: false,
              })
              return setCurrentStep(newStep)
            }}
            handleFinalStep={async () => {
              await handleFinalStep();
              renderSubmitButton();
            }}
            isNextDisabled={isNextButtonDisabled || submitState.status === 'loading'}
          />
        </div>
        {submitState.status === 'error' && (
          <FeedbackModal
            isSuccess={false}
            message={submitState.message || 'Erro ao enviar denúncia'}
            onClose={() => setSubmitState({ status: 'idle' })}
            onRedirect={() => navigate('/')}
          />
        )}
      </div>
    </>
  );
};
