import jsPDF from "jspdf";
import { Complaint, InjuryLocation } from "../../features/denuncia/types/denuncia";
import { UserOptions } from "jspdf-autotable";

const LOCATION_TRANSLATIONS: Record<string, string> = {
  "Cabeça": 'Cabeça',
  Face: 'Face',
  "Pescoço": 'Pescoço'
};

export const generatePDF = (complaint: Complaint) => {
  const doc = new jsPDF();
  doc.setFont("helvetica");

  // Cabeçalho
  doc.setFontSize(20);
  doc.text("Relatório de Denúncia", 105, 20, { align: "center" });
  doc.setFontSize(12);
  doc.text(`Data do relatório: ${new Date().toLocaleDateString('pt-BR')}`, 20, 30);

  // Função auxiliar para criar seções
  const addSection = (title: string, startY: number): number => {
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(title, 20, startY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    return startY + 10;
  };

  const translateLocations = (locations?: InjuryLocation): string => {
    if (!locations || Object.keys(locations).length === 0) {
      return 'Não se aplica';
    }

    const selectedLocations = Object.entries(locations)
      .filter(([, value]) => value)
      .map(([key]) => LOCATION_TRANSLATIONS[key] || key);

    return selectedLocations.length > 0 ? selectedLocations.join(', ') : 'Não se aplica';
  };

  // Dados do Local
  let yPos = addSection("1. Dados do Local", 45);
  if (complaint.address.hasNoInformation) {
    doc.text(`Bairro aproximado: ${complaint.address.neighborhood || "Não informado"}`, 20, yPos);
  } else {
    doc.text([
      `CEP: ${complaint.address.cep || "Não informado"}`,
      `Rua: ${complaint.address.street || "Não informado"}`,
      `Número: ${complaint.address.number || "Não informado"}`,
      `Bairro: ${complaint.address.neighborhood || "Não informado"}`
    ], 20, yPos);
  }

  // Dados da Vítima
  yPos = addSection("2. Dados da Vítima", yPos + 25);
  doc.text([
    `Nome: ${complaint.victimData.name}`,
    `Data de Nascimento: ${new Date(complaint.victimData.birthDate).toLocaleDateString('pt-BR')}`,
    `Sexo: ${complaint.victimData.gender === 'male' ? 'Masculino' :
      complaint.victimData.gender === 'female' ? 'Feminino' : 'Outro'}`
  ], 20, yPos);

  // Detalhes do Caso - Tabela
  yPos = addSection("3. Detalhes do Caso", yPos + 25);

  // Preparar dados da tabela
  const tableData = [
    // Lesões Gerais
    ['Sinais de Violência Física', complaint.caseDetails.hasAggressionSigns ? 'Sim' : '-', 'Não se aplica'],
    ['Lesão no Olho', complaint.caseDetails.hasEyeInjury ? 'Sim' : '-', 'Não se aplica'],

    // Lesões com Localização
    ['Hematoma', complaint.caseDetails.hasBruises ? 'Sim' : '-',
      complaint.caseDetails.hasBruises && translateLocations(complaint.caseDetails.bruisesLocation)],

    ['Abrasão', complaint.caseDetails.hasAbrasion ? 'Sim' : '-', translateLocations(complaint.caseDetails.abrasionLocation)],

    ['Laceração', complaint.caseDetails.hasLaceration ? 'Sim' : '-', translateLocations(complaint.caseDetails.lacerationLocation)],

    ['Queimadura', complaint.caseDetails.hasBurns ? 'Sim' : '-', translateLocations(complaint.caseDetails.burnsLocation)],

    ['Marca de Mordida', complaint.caseDetails.hasBiteMarks ? 'Sim' : '-', translateLocations(complaint.caseDetails.biteMarksLocation)],
  ];

  // Gerar tabela
  (doc as unknown as { autoTable: (options: UserOptions) => void }).autoTable({
    startY: yPos,
    head: [['Lesão', 'Presente', 'Localização']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: [251, 192, 45], // Cor de fundo do cabeçalho definida como #FBC02D
      textColor: [255, 255, 255], // Cor do texto do cabeçalho definida como #424242
      fontStyle: 'bold'
    },
    bodyStyles: {
      fillColor: [255, 255, 255], // Cor de fundo das células do corpo da tabela definida como #FFFFFF
      textColor: [66, 66, 66], // Cor do texto das células do corpo da tabela definida como #424242
      fontSize: 10, // Tamanho da fonte do corpo da tabela
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 'auto' }
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
      textColor: [66, 66, 66], // Cor do texto das linhas alternadas definida como #424242
      fontSize: 10, // Tamanho da fonte das linhas alternadas
    },
    margin: { left: 20, right: 20 },
  });

  // Informações Adicionais
  yPos = doc.lastAutoTable.finalY + 20;
  yPos = addSection("4. Informações Adicionais", yPos);

  if (complaint.additionalInfo.extraInformation) {
    const splitText = doc.splitTextToSize(complaint.additionalInfo.extraInformation, 170);
    doc.text(splitText, 20, yPos);
  } else {
    doc.text("Nenhuma informação adicional fornecida.", 20, yPos);
  }

  // Adicionar número das páginas
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Powered by OdontoGuardião`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );
  }

  // Salvar o PDF
  // doc.save(`denuncia_${protocol}.pdf`);
  return doc.output('blob');
};
