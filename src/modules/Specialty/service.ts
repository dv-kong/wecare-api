import SpecialtyDTO from "./dto";
import { ApiError } from "../../helpers/error";
import { ISpecialtyRepository } from "./repository";
import { Specialty } from "./entity";

export interface ISpecialtyService {
    getAll(): Promise<SpecialtyDTO[]>;
    create(specialtyData: any): Promise<{ specialty: SpecialtyDTO; }>;
    update(specialtyData: any): Promise<SpecialtyDTO>;
    delete(id: string): Promise<void>;
}

export default class SpecialtyService implements ISpecialtyService {
    private specialtyRepo;
    constructor(specialtyRepository: ISpecialtyRepository) {
        this.specialtyRepo = specialtyRepository;
    }

    async getAll() {
        const specialtys = await this.specialtyRepo.findAll();
        return specialtys.map((specialty: any) => new SpecialtyDTO(specialty));
    }

    async getById(id: string) {
        const specialty = await this.specialtyRepo.findById(id);
        return new SpecialtyDTO(specialty);
    }

    async create(specialtyData: Specialty) {
        const specialty = await this.specialtyRepo.findByName(specialtyData.name);
        if (specialty) {
            throw new ApiError(400, "Specialty already exists.");

        } else {

            const newSpecialty: SpecialtyDTO = await this.specialtyRepo.addNew(specialtyData);
            return { specialty: newSpecialty, message: "Specialty created." };
        }
    }

    async update(specialtyData: Specialty) {

        if (!specialtyData.id) {
            throw new ApiError(401, "Required ID not provided.");
        }
        const specialtyToUpdate = await this.specialtyRepo.findById(specialtyData.id);
        if (!specialtyToUpdate) {
            throw new ApiError(400, "Specialty does not exists.");
        }
        const updatedSpecialty: SpecialtyDTO = await this.specialtyRepo.update(specialtyData);
        return updatedSpecialty;
    }


    //   async login(specialtyData: Specialty) {
    //     if (!specialtyData.email)
    //       throw new ApiError(400, "Missing required email field.");
    //     if (!specialtyData.password)
    //       throw new ApiError(400, "Missing required password field.");

    //     const specialty = await this.specialtyRepo.findByEmail(specialtyData.email);

    //     if (!specialty) throw new ApiError(400, "Specialty does not exists.");

    //     const passwordMatch = await this.specialtyRepo.compareHash(
    //       specialtyData.password,
    //       specialty.password
    //     );
    //     if (!passwordMatch)
    //       throw new ApiError(400, "Specialty password does not match.");

    //     return new SpecialtyDTO(specialty);
    //   }

    async delete(id: string) {

        if (!id) {
            throw new ApiError(401, "Required ID not provided.");
        }
        const specialtytoDelete = await this.specialtyRepo.findById(id);
        if (!specialtytoDelete) {
            throw new ApiError(400, "Specialty does not exists.");
        }
        const deletedSpecialty = await this.specialtyRepo.deleteById(id);
        return deletedSpecialty;
    }
}
