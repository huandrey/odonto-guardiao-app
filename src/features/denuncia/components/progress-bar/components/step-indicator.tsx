import { Dispatch, SetStateAction } from "react";

export interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  stepNumber: number;
  label: string;
  isActive: boolean;
  onTap: (stepNumber: number) => void;
  isClickable: boolean;
  error: boolean;
  setError: Dispatch<SetStateAction<{ hasError: boolean; step: number; }>>
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ stepNumber, label, isActive, onTap, isClickable, error, setError }: StepIndicatorProps) => {
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

        console.log(stepNumber)
        if (stepNumber - 1 === 1 || stepNumber - 1 === 2) {
          setError({
            step: stepNumber - 1,
            hasError: true,
          });
        }

        if (stepNumber - 1 > 2) {
          setError({
            step: 2,
            hasError: true,
          });
        }
      }}
    >
      <div className={`step-indicator ${isActive ? 'active' : ''} ${error && 'error'}`}>
        {stepNumber}
      </div>
      <div className={`step-label ${error && 'error'}`}>{label}</div>
    </div>
  );
};
