import React from 'react';
import './resumo-denuncia.css';
import 'jspdf-autotable';
import { CaseDetails, Complaint } from '../../../types/denuncia';

interface ComplaintSummaryProps {
  complaint: Complaint;
}

const FIELD_TRANSLATIONS: Record<keyof CaseDetails, string> = {
  hasAggressionSigns: 'Sinais de Violência Física',
  hasEyeInjury: 'Lesão no Olho',
  hasBruises: 'Hematoma',
  bruisesLocation: 'Localização do Hematoma',
  hasAbrasion: 'Abrasão',
  abrasionLocation: 'Localização da Abrasão',
  hasLaceration: 'Laceração',
  lacerationLocation: 'Localização da Laceração',
  hasBurns: 'Queimadura',
  burnsLocation: 'Localização da Queimadura',
  hasBiteMarks: 'Marca de Mordida',
  biteMarksLocation: 'Localização da Marca de Mordida',
};

const LOCATION_TRANSLATIONS: Record<string, string> = {
  "Cabeça": 'Cabeça',
  Face: 'Face',
  "Pescoço": 'Pescoço'
};

export const ComplaintSummary: React.FC<ComplaintSummaryProps> = ({ complaint }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
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
              const translatedKey = FIELD_TRANSLATIONS[key as keyof CaseDetails];
              if (!translatedKey) return null; // Ignora campos sem tradução

              if (typeof value === 'boolean') {
                return (
                  <>
                    <p key={key}>
                      <strong>{translatedKey}:</strong> {value ? 'Sim' : '-'}
                    </p>
                  </>
                );
              }

              if (typeof value === 'object' && value !== null) {
                return (
                  <div key={key} className="location-details">
                    <p className="location-title">{translatedKey}:</p>
                    {Object.entries(value).map(([loc, checked]) => (
                      <p key={loc} className="location-item">
                        - {LOCATION_TRANSLATIONS[loc] || loc}: {checked ? 'Sim' : '-'}
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
          {complaint.additionalInfo.extraInformation ? (
            <div className="additional-info-item">
              {/* <p className="info-title">Informações Extras:</p> */}
              <p className="info-content">{complaint.additionalInfo.extraInformation}</p>
            </div>
          ) : (
            <div className="additional-info-item empty">
              <p className="info-content no-info">
                Nenhuma informação adicional foi registrada.
              </p>
            </div>
          )}
        </div>
      </div>
      <br />
    </div>
  );
};
