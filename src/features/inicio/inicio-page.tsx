import PageTransition from '../../shared/components/page-transition'
import { InicioV3Content } from './components/inicio-content/inicio-v3-content'

export const InicioPage = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  return (
    <PageTransition>
      <InicioV3Content />
    </PageTransition>
  )
}
