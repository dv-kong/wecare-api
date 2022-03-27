import PractitionnerDTO from "../dto";

export default interface IPractitionnerService {
  create(data: object): Promise<string>;
  findByEmail(email: string): Promise<PractitionnerDTO>;
  getAll(): Promise<PractitionnerDTO[]>;
  delete(id: string): void;
  findById(id: string): Promise<PractitionnerDTO>;
}
