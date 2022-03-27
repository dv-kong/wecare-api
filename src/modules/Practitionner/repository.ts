import { EntityRepository, EntityManager, DeleteResult } from "typeorm";
import Practitionner from "./entity";
import IPractitionnerRepository from "./interfaces/IPractitionnerRepository";

@EntityRepository()
class PractitionnerRepository implements IPractitionnerRepository {
  constructor(private manager: EntityManager) {}

  async findAll(): Promise<Practitionner[]> {
    try {
      return await this.manager.find(Practitionner);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async addNew(practitionner: object): Promise<Practitionner> {
    try {
      return await this.manager.save(Practitionner, practitionner);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async findByEmail(email: string): Promise<Practitionner | undefined> {
    try {
      return await this.manager.findOne(Practitionner, { email: email });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findById(id: string): Promise<Practitionner | undefined> {
    try {
      return await this.manager.findOne(Practitionner, id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteById(id: string): Promise<DeleteResult> {
    try {
      return await this.manager.delete(Practitionner, id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async updateById(id: string, practitionner: object): Promise<any> {
    try {
      const response = await this.manager.update(
        Practitionner,
        id,
        practitionner
      );

      const data: Practitionner | undefined = await this.manager.findOne(
        Practitionner,
        id
      );

      return { response, data };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default PractitionnerRepository;
