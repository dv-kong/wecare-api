import { Response, Request, NextFunction } from "express";
import UserDTO from "./../dto";

export default interface IUserService {
  create(user: UserDTO): Promise<UserDTO>;
  findByEmail(email: string): Promise<UserDTO>;
  login(credentials: {email: string, password: string}): Promise<UserDTO>;
  update(
    jwtTokens: string,
    email: string
  ): Promise<void>;
  delete(id: string): void;
  findById(req: Request, res: Response): Promise<UserDTO>;
}
