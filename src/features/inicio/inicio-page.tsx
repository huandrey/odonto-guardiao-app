import PageTransition from '../../shared/components/page-transition'
import { useScrollToTop } from '../../shared/hooks/use-scroll-to-top';
import { InicioV3Content } from './components/inicio-content/inicio-v3-content'

export const InicioPage = () => {
  useScrollToTop();

  return (
    <PageTransition>
      <InicioV3Content />
    </PageTransition>
  )
}
