// src/hooks/use-steps-validation.ts
import { useState } from 'react';

export type StepValidation = {
  [key: number]: boolean;
};

const initialStepsValidation: StepValidation = {
  1: false,
  2: false,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true, // Summary step is always valid
};

export const useStepsValidation = () => {
  const [stepsValidation, setStepsValidation] = useState<StepValidation>(initialStepsValidation);

  const updateStepValidation = (step: number, isValid: boolean) => {
    setStepsValidation(prev => ({
      ...prev,
      [step]: isValid
    }));
  };

  const isStepValid = (step: number) => stepsValidation[step];

  return {
    stepsValidation,
    updateStepValidation,
    isStepValid
  };
};
