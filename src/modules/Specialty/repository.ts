import { EntityRepository, EntityManager, DeleteResult } from "typeorm";
import { Specialty } from "./entity";
import SpecialtyDTO from "./dto";

export interface ISpecialtyRepository {
    //   findAll(): Promise<Specialty[]>;
    addNew(specialtyEntity: any): Promise<SpecialtyDTO>;
    //   findById(id: string): Promise<Specialty | undefined>;
    //   deleteById(id: string): Promise<DeleteResult>;
}

@EntityRepository()
class SpecialtyRepository implements ISpecialtyRepository {
    constructor(private manager: EntityManager) { }

    //   async findAll() {
    //     return await this.manager.find(Specialty);
    //   }

    async addNew(specialtyEntity) {
        const newSpecialty = await this.manager.save(Specialty, specialtyEntity);
        return new SpecialtyDTO(newSpecialty);
    }

    //   async findById(id: string) {
    //     return await this.manager.findOne(Specialty, id);
    //   }

    //   async findByEmail(specialtyEmail: string) {
    //     return await this.manager.findOne(Specialty, { email: specialtyEmail });
    //   }

    //   async deleteById(id: string): Promise<DeleteResult> {
    //     return await this.manager.delete(Specialty, id);
    //     // return await this.manager.remove(Specialty, id);
    //   }

    //   compareHash = async (password: string, hash: string) =>
    //     await bcrypt.compareSync(password, hash);
    // }
}
export default SpecialtyRepository;

