import React from 'react'
import './documentos-norteadores-content.css'
import legalDocuments from '../utils/legal-documents.json'
import { Header } from '../../../shared/components/header/components';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../../shared/components/footer';

interface LegalDocument {
  title: string;
  description: string;
  focusPoints: {
    title: string;
    page?: number;
  }[];
  url: string;
  localPath: string;
}

const DocumentosNorteadoresContent: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="legaldoc-container">
       <Header>
        <Header.Left>
          <Header.BackButton onClick={() => navigate(-1)} />
        </Header.Left>

        <Header.Center>
          <Header.Title>Documentos Norteadore</Header.Title>
        </Header.Center>

        <Header.Right>
          <></>
        </Header.Right>
      </Header>

      <br />
      <br />
      <main className="legaldoc-main-content">
        <div className="legaldoc-hero-section">
          <h1 className="legaldoc-hero-title">Biblioteca de <span className="legaldoc-highlight">Documentos Legais</span></h1>
          <p className="legaldoc-hero-description">
            Acesse documentos importantes com foco em artigos específicos relevantes para profissionais da saúde e educação.
          </p>
        </div>

        <div className="legaldoc-document-grid">
          {(legalDocuments as LegalDocument[]).map((doc, index) => (
            <div className="legaldoc-document-card" key={index}>
              <div className="legaldoc-document-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#FBC02D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="#FBC02D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="#FBC02D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="#FBC02D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H9H8" stroke="#FBC02D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="legaldoc-document-content">
                <h3 className="legaldoc-document-title">{doc.title}</h3>
                <p className="legaldoc-document-description">{doc.description}</p>
                
                <div className="legaldoc-focus-points">
                  <h4 className="legaldoc-focus-points-title">Pontos de Foco:</h4>
                  <ul className="legaldoc-focus-points-list">
                    {doc.focusPoints.map((point, idx) => (
                      <li className="legaldoc-focus-point-item" key={idx}>
                        {point.title}
                        {point.page && <span className="legaldoc-page-number"> (Página {point.page})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="legaldoc-document-actions">
                  <a 
                    href={doc.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="legaldoc-cta-button legaldoc-cta-primary"
                  >
                    Visualizar Online
                  </a>
                  <a 
                    href={doc.localPath} 
                    download 
                    className="legaldoc-cta-button legaldoc-cta-outline"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer pageTitle='Biblioteca Legal' pageDescription='Acesso a documentos legais importantes para Cirurgiões-Dentistas.'/>
    </div>
  );
};

export default DocumentosNorteadoresContent;
