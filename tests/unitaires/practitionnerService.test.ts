import PractitionnerDTO from "../../src/modules/Practitionner/dto";
import IPractitionnerRepository from "../../src/modules/Practitionner/interfaces/IPractitionnerRepository";
import IPractitionnerService from "../../src/modules/Practitionner/interfaces/IPractitionnerService";
import practitionners from "../mocks/practitionners";
import RepositoryMock from "../mocks/repository.mock";

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

describe("CRUD Practitionner test", () => {
  let repository: any;
  let service: PractitionnerService;

  beforeAll(() => {
    repository = new RepositoryMock(practitionners);
    service = new PractitionnerService(repository);
  });

  it("should create a practitionner", async () => {
    const practitionner = {
      id: "6",
      first_name: "Kev",
      last_name: "Lucken",
      email: "klucken5@unblog.fr",
      password: "QgUYNV",
      phone_number: "867-419-4434",
      address: "70717 Crest Line Trail",
      city: "Koudougou",
      postal_code: null,
      licence_number: "02-372-6844",
      status: true,
    };
    const response: string = await service.create(practitionner);
    expect(response).toBe("DATA CREATED");
  });

  it("should find a practionner by email and return an instance of PractitionnerDTO object", async () => {
    const email: string = "klucken5@unblog.fr";

    expect((await service.findByEmail(email)) instanceof PractitionnerDTO).toBe(
      true
    );
  });

  it("should find a practionner by id and return an instance of PractitionnerDTO object", async () => {
    const id: string = "3";

    expect((await service.findById(id)) instanceof PractitionnerDTO).toBe(true);
  });

  it("should delete a practitionner by id", async () => {
    const id: string = "6";
    expect(await service.delete(id)).toBe("DATA REMOVED");
  });

  it("should return a list of practitionners", async () => {
    expect(await service.getAll()).toEqual(practitionners);
  });
});
