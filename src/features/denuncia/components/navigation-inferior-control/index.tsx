import { useNavigate } from "react-router-dom"
import './navigation-inferior-control.css'
import { Modal } from "../../../inicio/components/modal";
import React from "react";

interface NavigationInferiorControlProps {
  totalSteps: number;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handleFinalStep: () => void;
  isNextDisabled?: boolean;
}

export const NavigationInferiorControl = ({
  currentStep,
  setCurrentStep,
  totalSteps,
  handleFinalStep,
  isNextDisabled = false
}: NavigationInferiorControlProps) => {
  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = React.useState(false);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <>
    { modalVisible && <Modal 
      title="Você tem certeza que deseja sair?" 
      primaryLabel="Não! Voltar de onde parei" 
      // warning="Estou ciente que perderei todas as informações preenchidas"
      onPrimary={() => setModalVisible(false)}
      onSecondary={() => navigate('/')}
    />}
    <div className="navigation-buttons">
      {currentStep === 1 && (
        <button
          className="button button-secondary"
          onClick={() => setModalVisible(true)}
        >
          Voltar para tela inicial
        </button>
      )}

      {currentStep > 1 && (
        <button
          className="button button-secondary"
          onClick={handlePrevious}
        >
          Voltar
        </button>
      )}

      {currentStep < totalSteps ? (
        <button
          className="button button-primary"
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          Próximo
        </button>
      ) : (
        <button
          className="button button-primary"
          onClick={handleFinalStep}
          disabled={isNextDisabled}
        >
          Enviar Denúncia
        </button>
      )}
    </div>
    </>
  )
}
