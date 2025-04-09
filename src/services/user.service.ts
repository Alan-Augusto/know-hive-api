import { IUser } from "../entities/user";
import { UserRepository } from "../repositories/user.repository";
import { generateToken } from "../utils/authorization.util";
import { BaseService } from "./base.service";
import bcrypt from "bcrypt";

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

  async login(email: string, password: string): Promise<{ user: IUser, token: string } | null> {

    const user: IUser | null = await this.userRepository.login(email);

    // Verificar se o usuário existe e a senha está correta
    const success = user && (await bcrypt.compare(password, user.password));

    if (success) {
      const token = generateToken(user);
      return { user, token };
    }

    return null;
  }
}
