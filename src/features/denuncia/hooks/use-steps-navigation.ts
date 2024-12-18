import { useState } from 'react';
import { StepValidation } from '../components/denuncia-content/denuncia-content';

export const useStepsNavigation = (totalSteps: number, stepsValidation: StepValidation) => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToSpecificStep = (step: number) => {
    const canGoToStep = Array.from({ length: step - 1 }, (_, i) => i + 1)
      .every(prevStep => stepsValidation[prevStep]);

    if (step > 0 && step <= totalSteps && canGoToStep) {
      setCurrentStep(step);
    }
  };

  return {
    currentStep,
    setCurrentStep,
    goToSpecificStep
  };
};
