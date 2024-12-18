// src/hooks/use-steps-validation.ts
import { useState } from 'react';

export type StepValidation = {
  [key: number]: boolean;
};

const initialStepsValidation: StepValidation = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
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
