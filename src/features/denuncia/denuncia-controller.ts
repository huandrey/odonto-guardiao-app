import { DenunciaService } from "./denuncia-service";
import { Complaint } from "./types/denuncia";

export type DenunciaState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  protocol?: string;
};

interface CouncilRegion {
  setor: string;
  nome: string;
  regiao: "norte" | "sul" | "leste" | "oeste";
  contato: string[];
  bairros: string[];
}

export class DenunciaController {
  private service: DenunciaService;

  constructor() {
    this.service = new DenunciaService();
  }

  async submitDenuncia(complaint: Complaint, pdf: Blob, protocol: string): Promise<DenunciaState> {
    try {
      
      const response = await this.service.submitComplaint(complaint, pdf, protocol);
      return {
        status: 'success',
        protocol: response.protocolo
      };
    } catch (error) {
      console.error(error);
      return {
        status: 'error',
        message: 'Erro ao enviar denúncia'
      };
    }
  }

  getAllBairros = (): string[] => {
    return this.service.getAllBairros();
  };

  findConselhoByBairro = (bairro: string): CouncilRegion | undefined => {
    return this.service.findConselhoByBairro(bairro);
  };
}
