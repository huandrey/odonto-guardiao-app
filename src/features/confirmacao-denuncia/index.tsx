import './style.css'
import { Complaint } from '../denuncia/types/denuncia';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
  complaint: Complaint;
  protocol: string;
  pdf: Blob;
}

export const ConfirmacaoDenuncia = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  if (!state?.complaint || !state?.protocol || !state?.pdf) {
    return <Navigate to="/" replace />;
  }

  const { protocol, pdf } = state;

  const downloadPDF = () => {
    const url = window.URL.createObjectURL(pdf);
    const link = document.createElement('a');
    link.href = url;
    link.download = `denuncia_${protocol}.pdf`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="confirmation-container">
      <div className="success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <h1 className="title">Denúncia Registrada com Sucesso!</h1>

      <div className="protocol">
        Protocolo: {protocol}
      </div>

      <p className="message">
        Agradecemos sua iniciativa em fazer essa denúncia. Sua ação é fundamental para construirmos uma sociedade mais segura e protegermos aqueles que precisam de ajuda.
      </p>

      <p className="message">
        O Conselho Tutelar responsável já foi notificado e tomará as providências necessárias.
      </p>

      <div className="buttons-container">
        <button className="button button-primary" onClick={downloadPDF}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Baixar Comprovante (PDF)
        </button>

        <button className="button button-secondary" onClick={() => navigate('/')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Voltar para Início
        </button>
      </div>

      <div className="divider"></div>

      <div className="contact-info">
        Em caso de dúvidas, entre em contato com o Conselho Tutelar da sua região:<br />
        <strong>Conselho Tutelar Norte</strong><br />
        Telefone: (83) 2017-0062
      </div>
    </div>
  )
}
