import {
  DeleteResult,
  EntityManager,
  EntityRepository,
  getCustomRepository,
  QueryFailedError,
  RepositoryNotTreeError,
  UpdateResult,
} from "typeorm";
import database from "../../src/config/database";
import Practitionner from "../../src/modules/Practitionner/entity";
import IPractitionnerRepository from "../../src/modules/Practitionner/interfaces/IPractitionnerRepository";
import express, { Application } from "express";

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

describe("Practitionner Repository crud and database testing", () => {
  let app: Application = express();
  let repository: IPractitionnerRepository;
  beforeAll(async () => {
    await database.connect();
    repository = getCustomRepository(PractitionnerRepository);
  });

  afterAll(async () => {
    let manager = database.getRepository<Practitionner>(Practitionner);
    await manager.clear();
    await database.close();
  });

  it("It should insert practitionner object in database", async () => {
    const practitionner = {
      id: "1",
      first_name: "Kev",
      last_name: "Lucken",
      email: "klucken5@unblog.fr",
      password: "QgUYNV",
      phone_number: "867-419-4434",
      address: "70717 Crest Line Trail",
      city: "Koudougou",
      postal_code: "75000",
      licence_number: "02-372-6844",
      status: true,
    };

    expect(await repository.addNew(practitionner)).toEqual(practitionner);
  });

  it("It should display a list of practitionner", async () => {
    const practitionners = await repository.findAll();
    expect(practitionners.length).toBeGreaterThan(0);
  });

  it("It should find a practitionner by reference", async () => {
    const practitionner = {
      id: "1",
      first_name: "Kev",
      last_name: "Lucken",
      email: "klucken5@unblog.fr",
      password: "QgUYNV",
      phone_number: "867-419-4434",
      address: "70717 Crest Line Trail",
      city: "Koudougou",
      postal_code: "75000",
      licence_number: "02-372-6844",
      status: true,
    };
    const request = await repository.findById("1");
    expect(request).toMatchObject(practitionner);
  });

  it("It should find a practitionner by email", async () => {
    const practitionner = {
      id: "1",
      first_name: "Kev",
      last_name: "Lucken",
      email: "klucken5@unblog.fr",
      password: "QgUYNV",
      phone_number: "867-419-4434",
      address: "70717 Crest Line Trail",
      city: "Koudougou",
      postal_code: "75000",
      licence_number: "02-372-6844",
      status: true,
    };
    const request = await repository.findByEmail("klucken5@unblog.fr");
    expect(request).toMatchObject(practitionner);
  });

  it("It should find a practitionner with email and update it with new data", async () => {
    const newPractitionner = {
      first_name: "Borris",
      last_name: "Brivic",
      email: "nanobot5@unblog.fr",
      password: "QgUYNV",
      phone_number: "867-419-4434",
      address: "70717 Crest Line Trail",
      city: "Koudougou",
      postal_code: "75000",
      licence_number: "02-372-7890",
      status: true,
    };

    const request = await repository.updateById("1", newPractitionner);

    console.log(request);
    const { response, data } = request;

    expect(response.affected).toBe(1);
    expect(data).toMatchObject(newPractitionner);
  });

  it("It should delete a practitionner in the list", async () => {
    const response = await repository.deleteById("1");

    expect(response.affected).toBe(1);
  });

  /**
   * ERROR TESTING //TODO
   */
  xit("It should return an error after trying to insert an object with duplicate property", async () => {
    const practitionner = {
      first_name: "Borris",
      last_name: "Brivic",
      email: "nanobot5@unblog.fr",
      password: "QgUYNV",
      phone_number: "867-419-4434",
      address: "70717 Crest Line Trail",
      city: "Koudougou",
      postal_code: "75000",
      licence_number: "02-372-7890",
      status: true,
    };

    expect(await repository.addNew(practitionner)).toThrow("Test");
  });

  xit("Test description", () => {
    const t = () => {
      throw new Error();
    };
    expect(t).toThrow(Error);
  });
});
