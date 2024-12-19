// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { ReportFormData, UpdateFormData } from './report-types';

// interface StepTwoProps {
//   formData: ReportFormData;
//   updateFormData: UpdateFormData;
//   nextStep: () => void;
//   prevStep: () => void;
// }

// export const QuestionarioVitimaContent: React.FC<StepTwoProps> = ({ formData, updateFormData, nextStep, prevStep }) => {
//   const { register, handleSubmit } = useForm<ReportFormData>({ defaultValues: formData });

//   const onSubmit = (data: ReportFormData) => {
//     updateFormData(data);
//     nextStep();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="step-form">
//       <div className="form-group">
//         <label htmlFor="sexualAbuse">Foi identificado algum possível abuso sexual sofrido pela vítima?</label>
//         <textarea id="sexualAbuse" {...register("sexualAbuse")} />
//       </div>

//       <div className="form-group">
//         <label htmlFor="victimVersion">Qual foi a versão do paciente sobre os fatos vistos?</label>
//         <textarea id="victimVersion" {...register("victimVersion")} />
//       </div>

//       <div className="form-group">
//         <label htmlFor="guardianVersion">Qual foi a versão do responsável da vítima?</label>
//         <textarea id="guardianVersion" {...register("guardianVersion")} />
//       </div>

//       <div className="form-group">
//         <label htmlFor="additionalObservations">Alguma outra observação?</label>
//         <textarea id="additionalObservations" {...register("additionalObservations")} />
//       </div>

//       <div className="button-group">
//         <button type="button" onClick={prevStep} className="prev-button">Voltar</button>
//         <button type="submit" className="next-button">Próxima Etapa</button>
//       </div>
//     </form>
//   );
// };
