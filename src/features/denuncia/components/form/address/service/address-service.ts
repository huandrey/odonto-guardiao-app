import axios from 'axios';
import { CepResponse } from '../@types';

export class AddressService {
  private readonly API_URL = 'https://viacep.com.br/ws';

  getAddressByCep = async (cep: string): Promise<CepResponse> => {
    try {
      const response = await axios.get(`${this.API_URL}/${cep}/json`);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Erro ao enviar denúncia');
      }

      return response.data as CepResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erro ao enviar denúncia');
      }
      throw error;
    }
  }
}
