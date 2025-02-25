import { CepResponse } from "./@types";
import { AddressService } from "./service/address-service";

export class AddressController {
  private service: AddressService;

  constructor() {
    this.service = new AddressService();
  }

  async getAddressByCep(cep: string): Promise<CepResponse | undefined> {
    try {
      const response = await this.service.getAddressByCep(cep);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
