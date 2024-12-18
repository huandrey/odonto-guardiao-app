import React from 'react';
import { BodyPart, Complaint, InjuryLocation } from '../../types/denuncia';
import './resumo-denuncia.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ComplaintSummaryProps {
  complaint: Complaint;
  onChange: (complaint: Complaint) => void;
  onValidationChange?: (isValid: boolean) => void; // Nova prop
}


const checkNewPage = (doc: jsPDF, yPos: number, marginBottom: number = 20): number => {
  const pageHeight = doc.internal.pageSize.height;
  if (yPos + marginBottom > pageHeight) {
    doc.addPage();
    return 20; // Nova posição inicial no topo da página
  }
  return yPos;
};

export const ComplaintSummary: React.FC<ComplaintSummaryProps> = ({ complaint }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Configurações iniciais
    doc.setFont("helvetica");
    doc.setFontSize(20);

    // Título
    doc.text("Relatório de Denúncia", 105, 20, { align: "center" });
    doc.setFontSize(12);

    // Data do relatório
    const currentDate = new Date().toLocaleDateString('pt-BR');
    doc.text(`Data do relatório: ${currentDate}`, 20, 30);

    // Função auxiliar para adicionar seções
    const addSection = (title: string, startY: number): number => {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(title, 20, startY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      return startY + 10;
    };

    // Endereço
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
        complaint.victimData.gender === 'female' ? 'Feminino' : 'Outro'
      }`
    ], 20, yPos);

    // Detalhes do Caso
    yPos = addSection("3. Detalhes do Caso", yPos + 25);

    // Tabela de verificações
    const tableData = [];
    const processCheck = (condition: boolean, text: string) =>
      [`${text}`, condition ? 'Sim' : 'Não'];

    tableData.push(processCheck(complaint.caseDetails.hasAggressionSigns, 'Sinais de Agressão'));
    tableData.push(processCheck(complaint.caseDetails.hasEyeInjury, 'Lesão no Olho'));
    tableData.push(processCheck(complaint.caseDetails.hasBruises, 'Hematoma Visível'));
    tableData.push(processCheck(complaint.caseDetails.hasAbrasion, 'Abrasão'));
    tableData.push(processCheck(complaint.caseDetails.hasLaceration, 'Laceração'));
    tableData.push(processCheck(complaint.caseDetails.hasBurns, 'Queimadura'));
    tableData.push(processCheck(complaint.caseDetails.hasBiteMarks, 'Marca de Mordida'));
    tableData.push(processCheck(complaint.caseDetails.hasLabialFreinumLaceration, 'Laceração no Freio Labial'));
    tableData.push(processCheck(complaint.caseDetails.hasLingualFreinumLaceration, 'Laceração no Freio Lingual'));
    tableData.push(processCheck(complaint.caseDetails.hasPalateTrauma, 'Trauma no Palato'));
    tableData.push(processCheck(complaint.caseDetails.hasDentalTrauma, 'Trauma Dental'));

    (doc as any).autoTable({
      startY: yPos,
      head: [['Verificação', 'Resultado']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [244, 182, 60] }, // RGB para #F4B63C
      margin: { left: 20, right: 20 }
    });

    yPos = doc.lastAutoTable.finalY + 10;
    yPos = checkNewPage(doc, yPos);

    const addLocationInfo = (title: string, location?: InjuryLocation) => {
      if (location) {
        const locations = (Object.keys(location) as Array<keyof InjuryLocation>)
          .filter(key => location[key])
          .map(key => BodyPart[key]);

        if (locations.length > 0) {
          doc.text(`${title}: ${locations.join(', ')}`, 20, doc.lastAutoTable.finalY + 10);
          return doc.lastAutoTable.finalY + 15;
        }
      }
      return doc.lastAutoTable.finalY;
    };

    // Localizações das lesões
    yPos = doc.lastAutoTable.finalY + 15;
    yPos = checkNewPage(doc, yPos);

    // Adiciona um subtítulo para a seção de localizações
    if (complaint.caseDetails.hasBruises ||
      complaint.caseDetails.hasAbrasion ||
      complaint.caseDetails.hasLaceration ||
      complaint.caseDetails.hasBurns ||
      complaint.caseDetails.hasBiteMarks) {

      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text("Localização das Lesões:", 20, yPos);
      doc.setFont("helvetica", "normal");
      yPos += 10;
    }
    yPos = checkNewPage(doc, yPos + 10);

    const hasAnyLocation = [
      complaint.caseDetails.bruisesLocation,
      complaint.caseDetails.abrasionLocation,
      complaint.caseDetails.lacerationLocation,
      complaint.caseDetails.burnsLocation,
      complaint.caseDetails.biteMarksLocation
    ].some(location => 
      location && Object.values(location).some(value => value)
    );

    if (hasAnyLocation) {
      yPos = checkNewPage(doc, yPos);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Localização das Lesões:", 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      yPos += 15;


      if (complaint.caseDetails.hasBruises && complaint.caseDetails.bruisesLocation) {
        yPos = addLocationInfo('Hematomas', complaint.caseDetails.bruisesLocation);
      }
      if (complaint.caseDetails.hasAbrasion && complaint.caseDetails.abrasionLocation) {
        yPos = addLocationInfo('Abrasões', complaint.caseDetails.abrasionLocation);
      }
      if (complaint.caseDetails.hasLaceration && complaint.caseDetails.lacerationLocation) {
        yPos = addLocationInfo('Lacerações', complaint.caseDetails.lacerationLocation);
      }
      if (complaint.caseDetails.hasBurns && complaint.caseDetails.burnsLocation) {
        yPos = addLocationInfo('Queimaduras', complaint.caseDetails.burnsLocation);
      }
      if (complaint.caseDetails.hasBiteMarks && complaint.caseDetails.biteMarksLocation) {
        yPos = addLocationInfo('Marcas de Mordida', complaint.caseDetails.biteMarksLocation);
      }
    }

    // Informações Adicionais
    yPos = checkNewPage(doc, yPos + 10);
    yPos = addSection("4. Informações Adicionais", yPos);

    // Informações Adicionais
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    yPos = addSection("4. Informações Adicionais", yPos + 15);

    if (complaint.additionalInfo.extraInformation) {
      doc.text("Informações Extras:", 20, yPos);
      doc.setFontSize(10);
      const splitExtra = doc.splitTextToSize(complaint.additionalInfo.extraInformation, 1120);
      doc.text(splitExtra, 20, yPos + 5);
      yPos += 10 + (splitExtra.length * 5);
    }

    // Rodapé
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Página ${i} de ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      );
    }

    // Salvar o PDF
    doc.save(`denuncia_${currentDate.replace(/\//g, '-')}.pdf`);
  };

  return (
    <div className="complaint-summary">
      <h2>Resumo da Denúncia</h2>

      <div className="summary-sections">
        <div className="summary-section">
          <h3>Endereço da Vítima</h3>
          {complaint.address.hasNoInformation ? (
            <p>Bairro aproximado: {complaint.address.neighborhood}</p>
          ) : (
            <>
              <p><strong>CEP:</strong> {complaint.address.cep}</p>
              <p><strong>Rua:</strong> {complaint.address.street}</p>
              <p><strong>Número:</strong> {complaint.address.number}</p>
              <p><strong>Bairro:</strong> {complaint.address.neighborhood}</p>
            </>
          )}
        </div>

        <div className="summary-section">
          <h3>Dados da Vítima</h3>
          <p><strong>Nome:</strong> {complaint.victimData.name}</p>
          <p><strong>Data de Nascimento:</strong> {formatDate(complaint.victimData.birthDate)}</p>
          <p><strong>Sexo:</strong> {
            complaint.victimData.gender === 'male' ? 'Masculino' :
              complaint.victimData.gender === 'female' ? 'Feminino' : 'Outro'
          }</p>
        </div>

        <div className="summary-section">
          <h3>Detalhes do Caso</h3>
          <div className="details-list">
            {Object.entries(complaint.caseDetails).map(([key, value]) => {
              if (typeof value === 'boolean') {
                return (
                  <p key={key}>
                    <strong>{key}:</strong> {value ? 'Sim' : 'Não'}
                  </p>
                );
              }
              if (typeof value === 'object' && value !== null) {
                return (
                  <div key={key} className="location-details">
                    <p className="location-title">Localização:</p>
                    {Object.entries(value).map(([loc, checked]) => (
                      <p key={loc} className="location-item">
                        - {loc}: {checked ? 'Sim' : 'Não'}
                      </p>
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        <div className="summary-section">
          <h3>Informações Adicionais</h3>
          {complaint.additionalInfo.extraInformation && (
            <div className="additional-info-item">
              <p className="info-title">Informações Extras:</p>
              <p className="info-content">{complaint.additionalInfo.extraInformation}</p>
            </div>
          )}
        </div>
      </div>

      <div className="action-buttons">
        <button
          className="button button-secondary"
          onClick={generatePDF}
        >
          Baixar PDF
        </button>

        <button
          className="button button-primary"
          onClick={() => console.log()}
        >
          Enviar Denúncia
        </button>
      </div>
    </div>
  );
};


// ... resto do código permanece igual até a parte da localização ...

// const addLocationInfo = (title: string, location?: { "Cabeça": boolean; "Rosto": boolean; "Pescoço": boolean }): number => {
//   if (location) {
//     const locations = Object.entries(location)
//       .filter(([_, value]) => value)
//       .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1));

//     if (locations.length > 0) {
//       doc.setFontSize(12);
//       const text = `${title}: ${locations.join(', ')}`;
//       const splitText = doc.splitTextToSize(text, 1120);
//       doc.text(splitText, 20, yPos);
//       return yPos + (splitText.length * 12);
//     }
//   }
//   return yPos;
// };


// ... resto do código permanece igual
