import { Header } from '../../../../shared/components/header/components'
import { useNavigate } from 'react-router-dom';
import { FAQ } from '../faq';
import illustration from '../../../../assets/father.jpeg'

import './inicio-v3-content.css'
import { Footer } from '../../../../shared/components/footer';

export const InicioV3Content = () => {
  const navigation = useNavigate();

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
      <Footer pageTitle='OdontoGuardião' pageDescription='Plataforma dedicada ao combate à violência infato-juvenil através do olhar atento dos profissionais da odontologia.'/>
    </div>
  )
}
