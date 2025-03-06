import { useNavigate } from 'react-router-dom'
import './style.css'

export const Footer = ({
  pageTitle,
  pageDescription,
}: {
  pageTitle: string
  pageDescription: string
}) => {
  const navigation = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>{pageTitle}</h3>
          <p className="footer-description">{pageDescription}</p>
        </div>

        <div className="footer-section">
          <h4>Links Rápidos</h4>
          <ul>
            <li><button onClick={() => navigation('/denuncia')}>Fazer denúncia</button></li>
            <li><button onClick={() => navigation('/documentos-norteadores')}>Documentos Norteadores</button></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contatos de Emergência</h4>
          <ul>
            <li>Disque 100 - Direitos Humanos</li>
            <li>Disque 180 - Violência contra Mulher</li>
            <li>Disque 190 - Polícia Militar</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Conselhos Tutelares</h4>
          <ul>
            <li>C.T. Norte: (83) 2017-0062</li>
            <li>C.T. Sul: (83) 2017-0059</li>
            <li>C.T. Leste: (83) 2017-0061</li>
            <li>C.T. Oeste: (83) 2017-0060</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 OdontoGuardião. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
