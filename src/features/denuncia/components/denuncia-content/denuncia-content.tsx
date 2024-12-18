import React, { useState } from 'react';

import './denuncia-content.css';

import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '../progress-bar';
import { FeedbackModal } from '../modal_feedback';
import { NavigationInferiorControl } from '../navigation-inferior-control';
import { StepsRenderer } from '../steps-renderer';
import { useComplaintForm } from '../../hooks/use-denuncia-form';
import { useStepsValidation } from '../../hooks/use-step-validation';
import { useStepsNavigation } from '../../hooks/use-steps-navigation';

export type StepValidation = {
  [key: number]: boolean;
};

export const ComplaintForm: React.FC = () => {
  const navigate = useNavigate();
  const totalSteps = 7;
  const { complaint, updateComplaint } = useComplaintForm();
  const { stepsValidation, updateStepValidation } = useStepsValidation();
  const { currentStep, setCurrentStep, goToSpecificStep } = useStepsNavigation(totalSteps, stepsValidation);
  const [feedback, setFeedback] = useState({ show: false, success: false, message: '' });


  const isNextButtonDisabled = !stepsValidation[currentStep];


  const redirectToHome = () => {
    navigate('/home');
  };

  return (
    <div className="complaint-form">
      <ProgressBar currentStep={currentStep} onTap={goToSpecificStep} stepsValidation={stepsValidation} />
      <div className="step-content">
        <StepsRenderer
          currentStep={currentStep}
          complaint={complaint}
          onComplaintUpdate={updateComplaint}
          onValidationChange={(isValid) => updateStepValidation(currentStep, isValid)}
        />
        <NavigationInferiorControl
          totalSteps={totalSteps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          handleFinalStep={() => {}}
          isNextDisabled={isNextButtonDisabled}
        />
      </div>
      {feedback.show && (
        <FeedbackModal
          isSuccess={feedback.success}
          message={feedback.message}
          onClose={() => setFeedback({ show: false, success: false, message: '' })}
          onRedirect={redirectToHome}
        />
      )}
    </div>
  );
};

 // const [showFeedback, setShowFeedback] = useState(false);
  // const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  // const [feedbackMessage, setFeedbackMessage] = useState('');


  // const totalSteps = 7;



  // const handleSubmitComplaint = async () => {
  //   try {
  //     // Simulando uma chamada à API
  //     // Substitua por sua chamada real à API
  //     // await api.post('/complaints', complaint);

  //     setFeedbackSuccess(true);
  //     setFeedbackMessage('Sua denúncia foi enviada com sucesso. Obrigado por contribuir para um mundo mais seguro.');
  //     setShowFeedback(true);
  //   } catch (error: unknown) {
  //     console.error(error);
  //     setFeedbackSuccess(false);
  //     setFeedbackMessage('Ocorreu um erro ao enviar sua denúncia. Por favor, tente novamente.');
  //     setShowFeedback(true);
  //   }
  // };
