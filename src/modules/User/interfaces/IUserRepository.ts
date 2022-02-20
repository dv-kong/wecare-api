import User from "../model";

export default interface IUserRepository {
    findByEmail(email: string): Promise<User>
    create(user: User): Promise<User>
    login(email: string): Promise<User>
    update(jwtTokens: string, email: string): void
    delete(id: string): void
    findById(id: string): Promise<User>
}