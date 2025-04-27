// import React from 'react';

// import './informacoes-adicionais-step.css';
// import { AdditionalInfo } from '../../../types/denuncia';


// interface AdditionalInfoStepProps {
//   additionalInfo: AdditionalInfo;
//   onChange: (additionalInfo: AdditionalInfo) => void;
// }

// export const AdditionalInfoStep: React.FC<AdditionalInfoStepProps> = ({ additionalInfo, onChange }) => {
//   return (
//     <div className="additional-info-step">
//       <h2>Informações Adicionais</h2>

//       <div className="info-cards">
//         <div className="info-card">
//           <h3>Informações Adicionais sobre o Caso</h3>
//           <p className="description">
//             Você possui mais informações sobre o caso? Toda informação será considerada como importante.
//           </p>
//           <textarea
//             value={additionalInfo.extraInformation || ''}
//             onChange={(e) => onChange({
//               ...additionalInfo,
//               extraInformation: e.target.value
//             })}
//             placeholder="Descreva aqui informações adicionais sobre o caso..."
//           />
//         </div>

//         <div className="info-card">
//           <h3>Relato da Vítima</h3>
//           <textarea
//             value={additionalInfo.victimReport || ''}
//             onChange={(e) => onChange({
//               ...additionalInfo,
//               victimReport: e.target.value
//             })}
//             placeholder="Digite aqui o relato da vítima..."
//           />
//         </div>

//         <div className="info-card">
//           <h3>Versão do Responsável</h3>
//           <textarea
//             value={additionalInfo.guardianVersion || ''}
//             onChange={(e) => onChange({
//               ...additionalInfo,
//               guardianVersion: e.target.value
//             })}
//             placeholder="Digite aqui a versão apresentada pelo responsável..."
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
