import { Dispatch, SetStateAction } from "react";

export interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  stepNumber: number;
  label: string;
  currentStep: number;
  isActive: boolean;
  onTap: (stepNumber: number) => void;
  isClickable: boolean;
  error: boolean;
  setError: Dispatch<SetStateAction<{ hasError: boolean; step: number; }>>
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ stepNumber, label, currentStep, isActive, onTap, isClickable, error, setError }: StepIndicatorProps) => {
  return (
    <div
      className={`step-indicator-wrapper ${!isClickable ? 'disabled' : ''}`}
      onClick={() => {
        if (isClickable) {
          setError({
            step: -2,
            hasError: false,
          })
          onTap(stepNumber)
          return;
        }

        setError({
          step: currentStep,
          hasError: true,
        });
      }}
    >
      <div className={`step-indicator ${isActive ? 'active' : ''} ${error && 'error'}`}>
        {stepNumber}
      </div>
      <div className={`step-label ${error && 'error'}`}>{label}</div>
    </div>
  );
};
