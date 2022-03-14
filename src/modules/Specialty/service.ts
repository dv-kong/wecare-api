import SpecialtyDTO from "./dto";
import { ApiError } from "../../helpers/error";
import { ISpecialtyRepository } from "./repository";
import { Specialty } from "./entity";

export interface ISpecialtyService {
    // getAll(): Promise<SpecialtyDTO[]>;
    create(specialtyData: any): Promise<{ specialty: SpecialtyDTO; message: string }>;
    update(specialtyData: any): Promise<SpecialtyDTO>;
    // delete(id: string): Promise<void>;
}

export default class SpecialtyService implements ISpecialtyService {
    private userRepo;
    constructor(userRepository: ISpecialtyRepository) {
        this.userRepo = userRepository;
    }

    //   async getAll() {
    //     const users = await this.userRepo.findAll();
    //     return users.map((user: any) => new SpecialtyDTO(user));
    //   }

    //   async getById(id: string) {
    //     const user = await this.userRepo.findById(id);
    //     return new SpecialtyDTO(user);
    //   }

    async create(specialtyData: Specialty) {
        const specialty = await this.userRepo.findByName(specialtyData.name);
        if (specialty) {
            throw new ApiError(400, "Specialty already exists.");
        }
        const newSpecialty: SpecialtyDTO = await this.userRepo.addNew(specialtyData);
        return { specialty: newSpecialty, message: "Specialty created." };
    }

    //   async login(userData: Specialty) {
    //     if (!userData.email)
    //       throw new ApiError(400, "Missing required email field.");
    //     if (!userData.password)
    //       throw new ApiError(400, "Missing required password field.");

    //     const user = await this.userRepo.findByEmail(userData.email);

    //     if (!user) throw new ApiError(400, "Specialty does not exists.");

    //     const passwordMatch = await this.userRepo.compareHash(
    //       userData.password,
    //       user.password
    //     );
    //     if (!passwordMatch)
    //       throw new ApiError(400, "Specialty password does not match.");

    //     return new SpecialtyDTO(user);
    //   }

    //   async delete(id: string) {
    //     const user = await this.userRepo.deleteById(id);
    //     return user;
    //   }
}
