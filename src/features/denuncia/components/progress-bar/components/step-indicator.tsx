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
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ stepNumber, label, isActive, onTap, isClickable }: StepIndicatorProps) => {
  return (
    <div
      className={`step-indicator-wrapper ${!isClickable ? 'disabled' : ''}`}
      onClick={() => isClickable && onTap(stepNumber)}
    >
      <div className={`step-indicator ${isActive ? 'active' : ''}`}>
        {stepNumber}
      </div>
      <div className="step-label">{label}</div>
    </div>
  );
};
