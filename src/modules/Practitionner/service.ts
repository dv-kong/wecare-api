import PractitionnerDTO from "./dto";
import IPractitionnerRepository from "./interfaces/IPractitionnerRepository";
import IPractitionnerService from "./interfaces/IPractitionnerService";

export default class PractitionnerService implements IPractitionnerService {
  private repository: IPractitionnerRepository;

  constructor(repository: IPractitionnerRepository) {
    this.repository = repository;
  }
  async create(data: object): Promise<string> {
    return await this.repository.addNew(data);
  }
  async findByEmail(email: string): Promise<PractitionnerDTO> {
    const data = await this.repository.findByEmail(email);
    return new PractitionnerDTO(data);
  }
  async getAll(): Promise<PractitionnerDTO[]> {
    const datas = await this.repository.findAll();
    return datas.map((data) => new PractitionnerDTO(data));
  }
  async delete(id: string): Promise<any> {
    return await this.repository.deleteById(id);
  }
  async findById(id: string): Promise<PractitionnerDTO> {
    const data = await this.repository.findById(id);
    return new PractitionnerDTO(data);
  }
}
