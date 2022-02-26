import UserDTO from './dto';
import { ApiError } from '../../helpers/error';
import { IMailerService } from './../../libs/mailer';
import { IUserRepository } from './repository';
import { User } from './entity';

export interface IUserService {
    getAll() : Promise<UserDTO[]>
    register(userData: any) : Promise<UserDTO>
    login(userData: any) : Promise<UserDTO>
}

export default class UserService implements IUserService {

    private userRepo;
    private mailerService;
    constructor(userRepository: IUserRepository, mailerService : IMailerService) {
        this.userRepo = userRepository;
        this.mailerService = mailerService;
    }

    async getAll() {
        const users = await this.userRepo.findAll();
        return users.map((user: any) => new UserDTO(user));
    }

    async register(userData: User) {
        
        if (!userData.email || !userData.password)
            throw new ApiError(400, 'Missing required email and password fields');
        
        const newUser = await this.userRepo.addNew(userData);
        await this.mailerService.sendMail(userData);
        return new UserDTO(newUser);
    }

    async login(userData : User) {

        if (!userData.email || !userData.password)
            throw new ApiError(400, 'Missing required email and password fields');
        
        const user = await this.userRepo.findByEmail(userData);
        console.log(user);
        
        if (!user)
            throw new ApiError(400, 'User with the specified email does not exists');

        const passwordMatch = await this.userRepo.compareHash(userData.password, user.password);
        if (!passwordMatch)
            throw new ApiError(400, 'User password does not match');

        return new UserDTO(user);
    }
}

// import UserDTO from './dto';
// import bcrypt from "bcrypt";
// import ApiError from '../../helpers/error';
// import { Request, Response } from 'express';
// import IUserService from './interfaces/IUserService';
// import IUserRepository from './interfaces/IUserRepository';

// // get data sent by repository
// class UserService implements IUserService {
  
//     private UserRepository: IUserRepository;

//     constructor(userRepository: IUserRepository) {
//         this.UserRepository = userRepository;
//     }

//   async create(user: UserDTO) {
//     const newUser = await this.UserRepository.create(user);
//     return new UserDTO(newUser);
//   }

//   async findByEmail(email: string) {
    
//     const user = await this.UserRepository.findByEmail(email);

//     if (user) {
//       throw new ApiError(403, "Email already exists!");
//     }

//     return user;
//   }

//   async login(credentials: {email: string, password: string}) {
    
//     const {email, password} = credentials;

//     const requestedUser = await this.UserRepository.login(email);

//     const user = new UserDTO(requestedUser);

//     // Compares the password in the request (req) with the password stored in the database.
//     const correct = await bcrypt.compare(password, user.password);
//     if (!correct) {
//       throw new ApiError(400, "Incorrect credentials.");
//     }

//     return user;
//   }

//   // async update(jwtTokens: {access_token: string, refresh_token: string}, email: string) {
//   //     await this.UserRepository.update(jwtTokens, email);
//   // }

//   async delete(id:string) {
//     //throw errow if not successful
//     if (!id) {
//       throw new ApiError(400, "ID not found.");
//     }
//     return await this.UserRepository.delete(id);
//   }

//   async findById(req: Request, res: Response) {
//     let userId: string;

//     if (!res.locals.user.dataValues.id) {
//       throw new ApiError(500, "User ID not provided.");
//     }
//     userId = res.locals.user.dataValues.id;

//     const user: Promise<any> = await this.UserRepository.findById(userId);

//     if (!user) {
//       throw new ApiError(404, "User not found.");
//     }
//     return user;
//   }
// }

// export default UserService;
