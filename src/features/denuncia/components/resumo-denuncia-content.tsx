import React from 'react';
import { ReportFormData } from './report-types';

interface StepThreeProps {
  formData: ReportFormData;
  nextStep: () => void;
  prevStep: () => void;
}

export const ResumoDenunciaContent: React.FC<StepThreeProps> = ({ formData, nextStep, prevStep }) => {
  const generatePDF = () => {
    console.log("Gerando PDF...");
    nextStep();
  };

  return (
    <div className="step-form">
      <h2>Resumo da Denúncia</h2>
      <br />
      <div className="summary">
        <p><strong>Nome da vítima:</strong> {formData.victimName}</p>
        <p><strong>Data de nascimento:</strong> {formData.birthDate}</p>
        <p><strong>Sexo:</strong> {formData.gender}</p>
        <p><strong>Endereço:</strong> {formData.address}</p>
        <p className="description"><strong>Descrição:</strong> {formData.description}</p>
      </div>
      <p><strong>Distrito responsável:</strong> Norte</p>
      <div className="button-group">
        <button onClick={prevStep} className="prev-button">Voltar</button>
        <button onClick={generatePDF} className="generate-pdf-button">Gerar Documento da Denúncia</button>
      </div>
    </div>
  );
};
