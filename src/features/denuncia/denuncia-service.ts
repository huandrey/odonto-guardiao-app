import { Complaint } from "./types/denuncia";
import axios from 'axios';

interface CouncilRegion {
  setor: string;
  nome: string;
  regiao: "norte" | "sul" | "leste" | "oeste";
  contato: string[];
  bairros: string[];
}

interface SubmitComplaintResponse {
  message: string;
  protocolo: string;
}

export class DenunciaService {
  private readonly API_URL = import.meta.env.VITE_BACKEND_URL

  private static conselhosRegionais: CouncilRegion[] = [
    {
      "setor": "C.T 1 - Norte",
      "nome": "Conselho Tutelar Norte",
      "regiao": "norte",
      "contato": [
        "83 2017-0062 | 83 2017-0125"
      ],
      "bairros": [
        "Alto Branco",
        "Araxá",
        "Bela Vista",
        "Centro",
        "Conceição",
        "Cuités",
        "Jardim Continental",
        "Jardim Tavares",
        "Jeremias",
        "Lauritzen",
        "Louzeiro",
        "Monte Santo",
        "Nações",
        "Palmeira",
        "Prata",
        "Rosa Mística",
        "São José"
      ]
    },
    {
      "setor": "C.T 2 - Sul",
      "nome": "Conselho Tutelar Sul",
      "regiao": "sul",
      "contato": [
        "83 2017-0059 | 83 2017-0122"
      ],
      "bairros": [
        "Acácio Figueiredo",
        "Rocha Cavalcanti",
        "Bairro das Cidades",
        "Catolé de Boa Vista",
        "Cinza",
        "Cruzeiro",
        "Distrito dos Mecânicos",
        "Distrito Industrial",
        "Estação Velha",
        "Jardim Borborema",
        "Jardim Paulistano",
        "Liberdade",
        "Ligeiro",
        "Novo Horizonte",
        "Presidente Médice",
        "Rosa Cruz",
        "Ressureição",
        "Sítio Lucas",
        "Sítio Paus Brancos",
        "Sítio Salgadinhos",
        "Tambor",
        "Três Irmãs",
        "Velame",
        "Catingueira",
        "Sítio Estreito",
        "Portal Sudoeste",
        "Major Veneziano",
        "Catolé do Zé Ferreira"
      ]
    },
    {
      "setor": "C.T 3 - Leste",
      "nome": "Conselho Tutelar Leste",
      "regiao": "leste",
      "contato": [
        "83 2017-0061 | 83 2017-0124"
      ],
      "bairros": [
        "Antiga Cachoeira",
        "Sandra Cavalcante",
        "Belo Monte",
        "Castelo Branco",
        "Catolé",
        "Galante",
        "Glória 1 e 2",
        "Itararé",
        "Jardim América",
        "Jardim Atalaia",
        "Jardim Europa",
        "José Pinheiro",
        "Mirante",
        "Monte Castelo",
        "Nova Brasília",
        "Santa Terezinha",
        "Porteira de Pedra",
        "Santo Antonio",
        "Sítio Pau Dentro",
        "Sítio Brito",
        "Sítio Caridade",
        "Sítio Chã de Dentro",
        "Sítio de Baixo/Sítio de Cima",
        "Sítio Laranjeira",
        "Sítio Marinho",
        "Sítio Massapé",
        "Sítio Nova Varzéa",
        "Sítio Ramo",
        "Sítio Santana",
        "Sítio São Jorge",
        "Sítio Sirudo",
        "Vila Cabral Santa Terezinha",
        "Vila Maria da Luz",
        "Complexo Aluizio Campos"
      ]
    },
    {
      "setor": "C.T 4 - Oeste",
      "nome": "Conselho Tutelar Oeste",
      "regiao": "oeste",
      "contato": [
        "83 2017-0060 | 83 2017-0123"
      ],
      "bairros": [
        "Bodocongó",
        "Pedegral",
        "Campo de Angola I e II",
        "Catirina",
        "Centenário",
        "Conjunto dos Professores",
        "Conjunto Mariz",
        "Conjunto Sonho Meu",
        "Dinamérica",
        "Grande Campina",
        "Lago de Dentro",
        "Malvinas",
        "Morro do Pinto",
        "Morro do Urubu",
        "Mutirão",
        "Quarenta",
        "Novo Bodocongó",
        "Ramadinha",
        "Riacho dos Porcos",
        "Santa Cruz",
        "Santa Rosa",
        "São José da Mata",
        "Serra I e II",
        "Serrotão",
        "Sítio Bosque",
        "Sítio Izidro",
        "Sítio Joaquim Vieira",
        "Sítio São Januário",
        "Universitário",
        "Vila Cabral de Santa Rosa",
        "Jardim Quarenta",
        "Sítio Capim Grande",
        "Conjunto Alameda",
        "Severino Cabral"
      ]
    }
  ]

  getAllBairros = (): string[] => {
    return DenunciaService.conselhosRegionais
      .flatMap(conselho => conselho.bairros)
      .sort((a, b) => a.localeCompare(b));
  };

  findConselhoByBairro = (bairro: string): CouncilRegion | undefined => {
    return DenunciaService.conselhosRegionais.find(conselho =>
      conselho.bairros.includes(bairro)
    );
  };

  async submitComplaint(complaint: Complaint, pdf: Blob, protocol: string): Promise<SubmitComplaintResponse> {
    const formData = new FormData();
    formData.append('protocolo', protocol);
    formData.append('regiao', complaint.address?.councilRegion?.regiao || '');
    formData.append('pdf', pdf, `denuncia_${protocol}.pdf`);
    
    try {
      const response = await axios.post(
        `${this.API_URL}/denuncia`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Erro ao enviar denúncia');
      }

      return response.data as SubmitComplaintResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erro ao enviar denúncia');
      }
      throw error;
    }
  }
}
