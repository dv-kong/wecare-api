import { DeleteResult } from "typeorm";
import Practitionner from "../entity";

export default interface IPractitionnerRepository {
  findAll(): Promise<Practitionner[]>;
  addNew(practitionner: object): Promise<Practitionner>;
  findByEmail(email: string): Promise<Practitionner | undefined>;
  findById(id: string): Promise<Practitionner | undefined>;
  deleteById(id: string): Promise<DeleteResult>;
  updateById(id: string, practitionner: object): Promise<any>;
}
