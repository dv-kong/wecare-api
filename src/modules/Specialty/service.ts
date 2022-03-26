import SpecialtyDTO from "./dto";
import { ApiError } from "../../helpers/error";
import { ISpecialtyRepository } from "./repository";
import { Specialty } from "./entity";

export interface ISpecialtyService {
    getAll(): Promise<SpecialtyDTO[]>;
    create(specialtyData: any): Promise<{ specialty: SpecialtyDTO; }>;
    update(specialtyData: any): Promise<SpecialtyDTO>;
    delete(id: string): Promise<void>;
    getById(id: string): Promise<Specialty | undefined>;
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

    async getById(id: string): Promise<Specialty | undefined> {
        const specialty = await this.specialtyRepo.findById(id);
        return specialty;
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
