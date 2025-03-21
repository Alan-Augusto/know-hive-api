import { IUser, User } from "../entities/user";
import { UserRepository } from "../repositories/user.repository";
import { BaseService } from "./base.service";

export class UserService extends BaseService {
  private userRepository = new UserRepository();

  async existsByEmail(email: string): Promise<boolean> {
    return await this.userRepository.existsByEmail(email);
  }

  async register(user: IUser) {
    const userExists = await this.userRepository.existsByEmail(user.email);
    if (userExists) {
      return null;
    }
    return await this.userRepository.register(user); // Retorna o usuário registrado
  }
}
