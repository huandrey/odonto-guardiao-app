// import React from 'react';
// import { AdditionalInfo } from '../../types/denuncia';
// import './informacoes-adicionais.css';

// interface GuardianVersionStepProps {
//   additionalInfo: AdditionalInfo;
//   onChange: (additionalInfo: AdditionalInfo) => void;
// }

// export const GuardianVersionStep: React.FC<GuardianVersionStepProps> = ({
//   additionalInfo,
//   onChange
// }) => {
//   return (
//     <div className="additional-info-step">
//       <h2>Versão do Responsável</h2>

//       <div className="info-card">
//         <textarea
//           value={additionalInfo.guardianVersion || ''}
//           onChange={(e) => onChange({
//             ...additionalInfo,
//             guardianVersion: e.target.value
//           })}
//           placeholder="Digite aqui a versão apresentada pelo responsável..."
//           className="info-textarea"
//         />
//       </div>
//     </div>
//   );
// };
