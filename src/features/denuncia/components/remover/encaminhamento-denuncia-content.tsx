// import React, { useState } from 'react';
// import { ReportFormData } from './report-types';

// interface StepFourProps {
//   formData: ReportFormData;
//   prevStep: () => void;
// }

// export const EncaminhamentoDenunciaContent: React.FC<StepFourProps> = ({ formData, prevStep }) => {
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const sendReport = () => {
//     // Lógica para enviar o relatório por e-mail
//     console.log("Enviando relatório por e-mail...");
//     setIsSubmitted(true);
//   };

//   if (isSubmitted) {
//     return (
//       <div className="success-message">
//         <h2>Denúncia Enviada com Sucesso!</h2>
//         <p>Sua denúncia foi enviada aos órgãos competentes.</p>
//         {formData.isAnonymous && (
//           <p className="anonymous-message">Esta denúncia foi realizada de forma anônima.</p>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="step-form">
//       <h2>Enviar Denúncia</h2>
//       <p>O documento da denúncia foi gerado. Deseja enviá-lo para os órgãos competentes?</p>
//       <div className="button-group">
//         <button onClick={prevStep} className="prev-button">Voltar</button>
//         <button onClick={sendReport} className="submit-button">Enviar Denúncia</button>
//       </div>
//     </div>
//   );
// };
