import React, { useEffect, useState } from 'react';

import './denuncia-content.css';

import { useNavigate } from 'react-router-dom';
import { useComplaintForm } from '../hooks/use-denuncia-form';
import { useStepsValidation } from '../hooks/use-step-validation';
import { useStepsNavigation } from '../hooks/use-steps-navigation';
import { ProgressBar } from './progress-bar';
import { StepsRenderer } from './form/steps-renderer';
import { NavigationInferiorControl } from './navigation-inferior-control';
import { FeedbackModal } from './modal_feedback';
import { DenunciaState } from '../denuncia-controller';
import { Header } from '../../../shared/components/header/components';
import { Step } from './progress-bar/components/step-indicator';
import { Modal } from '../../inicio/components/modal';
import { generatePDF } from '../../../shared/utils/generate-pdf';

export type StepValidation = {
  [key: number]: boolean;
};

export const ComplaintForm: React.FC = () => {
  const navigate = useNavigate();
  const totalSteps = 7;
  const { complaint, updateComplaint, setPdf, hasExistingComplaintData, clearStoredData } = useComplaintForm();
  const { stepsValidation, updateStepValidation } = useStepsValidation();
  const { currentStep, setCurrentStep, goToSpecificStep } = useStepsNavigation(totalSteps, stepsValidation);
  const [submitState, setSubmitState] = useState<DenunciaState>({ status: 'idle' });
  const [modalVisible, setModalVisible] = React.useState(false)

  // const denunciaController = new DenunciaController();

  const isNextButtonDisabled = !stepsValidation[currentStep];

  const handleFinalStep = async () => {
    setSubmitState({ status: 'loading' });

    try {
      const pdfBlob = generatePDF(complaint);
      setPdf(pdfBlob!);

      const protocol = `DEN-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
      // const result = await denunciaController.submitDenuncia(complaint, pdfBlob, protocol);
      const result = {
        status: 'success',
        protocol: protocol
      } as DenunciaState;
      setSubmitState(result);

      if (result.status === 'success' && result.protocol) {
        navigate('/confirmacao-denuncia', {
          state: {
            complaint,
            protocol: result.protocol,
            pdf: pdfBlob
          }
        });
      }
    } catch (error) {
      console.error(error)
      setSubmitState({
        status: 'error',
        message: 'Erro inesperado ao enviar denúncia.'
      });
    }
  };

  const renderSubmitButton = () => {
    switch (submitState.status) {
      case 'loading':
        return (
          <button className="submit-button loading" disabled>
            <span className="loading-spinner"></span>
            Enviando...
          </button>
        );
      case 'error':
        return (
          <button className="submit-button error" onClick={() => setSubmitState({ status: 'idle' })}>
            Tentar Novamente
          </button>
        );
      default:
        return (
          <button
            className="submit-button"
            onClick={handleFinalStep}
            disabled={isNextButtonDisabled}
          >
            Enviar Denúncia
          </button>
        );
    }
  };

  const steps: Step[] = [
    { number: 1, label: "Endereço da Vítima" },
    { number: 2, label: "Dados da Vítima" },
    { number: 3, label: "Lesões Visíveis" },
    { number: 4, label: "Negligência Familiar" },
    { number: 5, label: "Violência Psicológica" },
    { number: 6, label: "Informações Adicionais" },
    { number: 7, label: "Resumo" }
  ];

  const [showContinueModal, setShowContinueModal] = useState(false)

  useEffect(() => {
    if (hasExistingComplaintData()) {
      setShowContinueModal(true);
    }
  }, [])

  const [error, setError] = useState({
    hasError: false,
    step: -2
  });

  return (
    <>
      {showContinueModal && <Modal
        title="Você tem uma denúncia em aberto, retomar de onde parou?"
        primaryLabel="Sim, desejo continuar"
        secondayLabel='Não, começar uma nova denúncia'
        onPrimary={() => setShowContinueModal(false)}
        onSecondary={() => {
          clearStoredData()
          setShowContinueModal(false)
        }}
      />}
      {modalVisible && <Modal
        title="Você tem certeza que deseja sair?"
        primaryLabel="Não! Voltar para onde estava"
        onPrimary={() => setModalVisible(false)}
        onSecondary={() => navigate("/")}
      />}
      <Header>
        <Header.Left>
          <Header.BackButton onClick={() => setModalVisible(true)} />
        </Header.Left>

        <Header.Center>
          <Header.Title>{steps[currentStep - 1].label}</Header.Title>
        </Header.Center>

        <Header.Right>
          <></>
        </Header.Right>
      </Header>

      <div className="complaint-form">
        <br />
        <br />
        <br />
        <ProgressBar currentStep={currentStep} onTap={goToSpecificStep} stepsValidation={stepsValidation} error={error} setError={setError} />
        <div className="step-content">
          <StepsRenderer
            currentStep={currentStep}
            complaint={complaint}
            onComplaintUpdate={updateComplaint}
            onValidationChange={(isValid) => updateStepValidation(currentStep, isValid)}
          />
          <br />
          <NavigationInferiorControl
            totalSteps={totalSteps}
            currentStep={currentStep}
            setCurrentStep={(newStep) => {
              setError({
                step: -2,
                hasError: false,
              })
              return setCurrentStep(newStep)
            }}
            handleFinalStep={async () => {
              await handleFinalStep();
              renderSubmitButton();
            }}
            isNextDisabled={isNextButtonDisabled || submitState.status === 'loading'}
          />
        </div>
        {submitState.status === 'error' && (
          <FeedbackModal
            isSuccess={false}
            message={submitState.message || 'Erro ao enviar denúncia'}
            onClose={() => setSubmitState({ status: 'idle' })}
            onRedirect={() => { }}
          />
        )}
      </div>
    </>
  );
};


// const generatePDF = () => {
//   const doc = new jsPDF();
//   doc.setFont("helvetica");

//   // Cabeçalho
//   doc.setFontSize(20);
//   doc.text("Relatório de Denúncia", 105, 20, { align: "center" });
//   doc.setFontSize(12);
//   doc.text(`Data do relatório: ${new Date().toLocaleDateString('pt-BR')}`, 20, 30);

//   // Função auxiliar para criar seções
//   const addSection = (title: string, startY: number): number => {
//     doc.setFontSize(16);
//     doc.setFont("helvetica", "bold");
//     doc.text(title, 20, startY);
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(10);
//     return startY + 10;
//   };

//   const translateLocations = (locations?: InjuryLocation): string => {
//     if (!locations || Object.keys(locations).length === 0) {
//       return 'Não se aplica';
//     }

//     const selectedLocations = Object.entries(locations)
//       .filter(([, value]) => value)
//       .map(([key]) => LOCATION_TRANSLATIONS[key] || key);

//     return selectedLocations.length > 0 ? selectedLocations.join(', ') : 'Não se aplica';
//   };

//   // Dados do Local
//   let yPos = addSection("1. Dados do Local", 45);
//   if (complaint.address.hasNoInformation) {
//     doc.text(`Bairro aproximado: ${complaint.address.neighborhood || "Não informado"}`, 20, yPos);
//   } else {
//     doc.text([
//       `CEP: ${complaint.address.cep || "Não informado"}`,
//       `Rua: ${complaint.address.street || "Não informado"}`,
//       `Número: ${complaint.address.number || "Não informado"}`,
//       `Bairro: ${complaint.address.neighborhood || "Não informado"}`
//     ], 20, yPos);
//   }

//   // Dados da Vítima
//   yPos = addSection("2. Dados da Vítima", yPos + 25);
//   doc.text([
//     `Nome: ${complaint.victimData.name}`,
//     `Data de Nascimento: ${new Date(complaint.victimData.birthDate).toLocaleDateString('pt-BR')}`,
//     `Sexo: ${complaint.victimData.gender === 'male' ? 'Masculino' :
//       complaint.victimData.gender === 'female' ? 'Feminino' : 'Outro'}`
//   ], 20, yPos);

//   // Detalhes do Caso - Tabela
//   yPos = addSection("3. Detalhes do Caso", yPos + 25);

//   // Preparar dados da tabela
//   const tableData = [
//     // Lesões Gerais
//     ['Sinais de Violência Física', complaint.caseDetails.hasAggressionSigns ? 'Sim' : '-', 'Não se aplica'],
//     ['Lesão no Olho', complaint.caseDetails.hasEyeInjury ? 'Sim' : '-', 'Não se aplica'],

//     // Lesões com Localização
//     ['Hematoma', complaint.caseDetails.hasBruises ? 'Sim' : '-',
//       complaint.caseDetails.hasBruises && translateLocations(complaint.caseDetails.bruisesLocation)],

//     ['Abrasão', complaint.caseDetails.hasAbrasion ? 'Sim' : '-', translateLocations(complaint.caseDetails.abrasionLocation)],

//     ['Laceração', complaint.caseDetails.hasLaceration ? 'Sim' : '-', translateLocations(complaint.caseDetails.lacerationLocation)],

//     ['Queimadura', complaint.caseDetails.hasBurns ? 'Sim' : '-', translateLocations(complaint.caseDetails.burnsLocation)],

//     ['Marca de Mordida', complaint.caseDetails.hasBiteMarks ? 'Sim' : '-', translateLocations(complaint.caseDetails.biteMarksLocation)],
//   ];

//   // Gerar tabela
//   (doc as unknown as { autoTable: (options: UserOptions) => void }).autoTable({
//     startY: yPos,
//     head: [['Lesão', 'Presente', 'Localização']],
//     body: tableData,
//     theme: 'striped',
//     headStyles: {
//       fillColor: [251, 192, 45], // Cor de fundo do cabeçalho definida como #FBC02D
//       textColor: [255, 255, 255], // Cor do texto do cabeçalho definida como #424242
//       fontStyle: 'bold'
//     },
//     bodyStyles: {
//       fillColor: [255, 255, 255], // Cor de fundo das células do corpo da tabela definida como #FFFFFF
//       textColor: [66, 66, 66], // Cor do texto das células do corpo da tabela definida como #424242
//       fontSize: 10, // Tamanho da fonte do corpo da tabela
//     },
//     columnStyles: {
//       0: { cellWidth: 'auto' },
//       1: { cellWidth: 30, halign: 'center' },
//       2: { cellWidth: 'auto' }
//     },
//     alternateRowStyles: {
//       fillColor: [245, 245, 245],
//       textColor: [66, 66, 66], // Cor do texto das linhas alternadas definida como #424242
//       fontSize: 10, // Tamanho da fonte das linhas alternadas
//     },
//     margin: { left: 20, right: 20 },
//   });

//   // Informações Adicionais
//   yPos = doc.lastAutoTable.finalY + 20;
//   yPos = addSection("4. Informações Adicionais", yPos);

//   if (complaint.additionalInfo.extraInformation) {
//     const splitText = doc.splitTextToSize(complaint.additionalInfo.extraInformation, 170);
//     doc.text(splitText, 20, yPos);
//   } else {
//     doc.text("Nenhuma informação adicional fornecida.", 20, yPos);
//   }

//   // Adicionar número das páginas
//   const pageCount = doc.getNumberOfPages();
//   for (let i = 1; i <= pageCount; i++) {
//     doc.setPage(i);
//     doc.setFontSize(10);
//     doc.text(
//       `Powered by OdontoGuardião`,
//       doc.internal.pageSize.width / 2,
//       doc.internal.pageSize.height - 10,
//       { align: "center" }
//     );
//   }

//   // Salvar o PDF
//   // doc.save(`denuncia_${protocol}.pdf`);
//   return doc.output('blob');
// };
