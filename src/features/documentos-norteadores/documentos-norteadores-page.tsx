import DocumentosNorteadoresContent from "./components/documentos-norteadores-content"
import { useScrollToTop } from "../../shared/hooks/use-scroll-to-top";

export const DocumentosNorteadoresPage = () => {
  useScrollToTop();
    
  return (
    <DocumentosNorteadoresContent />
  )
}
