import React from 'react';
import { Header } from '../../../../shared/components/header/components'
import { CroModal } from '../cro-modal'
import './inicio-v3-content.css'
import { useNavigate } from 'react-router-dom';
import { FAQ } from '../faq';
import illustration from '../../../../assets/father.jpeg'

export const InicioV3Content = () => {
  const navigation = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalSubmit = (data: { state: string; croNumber: string }) => {
    console.log('Dados do CRO:', data);
    setIsModalOpen(false);
    navigation('/denuncia');
  };

  return (
    <div className="container">
      <nav className="nav-inicio">
        <Header.Logo />
      </nav>

      <main>
        <div className="hero-content">
          <h1 className="hero-title">
            Protegendo vidas através do seu {" "}
            <span>olhar profissional</span>
          </h1>
          <p className="hero-description">
            Como profissional da Odontologia, você tem um papel fundamental na identificação
            de sinais de violência infato-juvenil. Portanto, use nossa plataforma para reportar casos suspeitos
            e ajudar a proteger quem mais precisa.
          </p>
          <div className="cta-button-container">
            <a className="cta-button" onClick={() => navigation('/denuncia')}>
              Realizar Denúncia
            </a>
            <a className="cta-button outline" onClick={() => navigation('/documentos-norteadores')}>
              Documentos Norteadores
            </a>
          </div>
        </div>

        <div className="illustration">
          <img className="animated-kid-image" src={illustration} alt="pai e filha" width={550} height={450} />
        </div>
      </main>
      <FAQ />

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>OdontoGuardião</h3>
            <p className="footer-description">
              Plataforma dedicada ao combate à violência através do olhar atento dos profissionais da odontologia.
            </p>
          </div>

          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul>
              <li><a href="/sobre">Sobre nós</a></li>
              <li><a href="/denuncia">Fazer denúncia</a></li>
              <li><a href="/ajuda">Central de ajuda</a></li>
              <li><a href="/contato">Contato</a></li>
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
          <p>&copy; 2024 OdontoGuardião. Todos os direitos reservados.</p>
        </div>
      </footer>

      <CroModal isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit} />
    </div>
  )
}
