import { EntityRepository, EntityManager, DeleteResult } from "typeorm";
import { Specialty } from "./entity";
import SpecialtyDTO from "./dto";

export interface ISpecialtyRepository {
    //   findAll(): Promise<Specialty[]>;
    addNew(specialtyEntity: any): Promise<Specialty>;
    //   findById(id: string): Promise<Specialty | undefined>;
    update(specialtyEntity: any): Promise<Specialty>;
    //   deleteById(id: string): Promise<DeleteResult>;
}

@EntityRepository()
class SpecialtyRepository implements ISpecialtyRepository {
    constructor(private manager: EntityManager) { }

    async findAll() {
        return await this.manager.find(Specialty);
    }

    async addNew(specialtyEntity): Promise<Specialty> {
        const newSpecialty = await this.manager.save(Specialty, specialtyEntity);
        return this.manager.save(Specialty, specialtyEntity);
    }

    //   async findById(id: string) {
    //     return await this.manager.findOne(Specialty, id);
    //   }

    async findByName(specialtyName: string) {
        return await this.manager.findOne(Specialty, { name: specialtyName });
    }
    async findById(specialtyId: string) {
        return await this.manager.findOne(Specialty, { id: specialtyId });
    }
    //   async findByEmail(specialtyEmail: string) {
    //     return await this.manager.findOne(Specialty, { email: specialtyEmail });
    //   }

    async update(specialtyData): Promise<Specialty> {
        let specialtyToUpdate = await this.manager.findOne(Specialty, { id: specialtyData.id });
        return await this.manager.save(Specialty, specialtyData);


    }

    //   async deleteById(id: string): Promise<DeleteResult> {
    //     return await this.manager.delete(Specialty, id);
    //     // return await this.manager.remove(Specialty, id);
    //   }

    //   compareHash = async (password: string, hash: string) =>
    //     await bcrypt.compareSync(password, hash);
    // }
}
export default SpecialtyRepository;

