import { IUser } from "../entities/user";
import { UserRepository } from "../repositories/user.repository";
import { generateToken } from "../utils/authorization.util";
import { BaseService } from "./base.service";
import { LoginAttemptService } from "./login-attempt.service";
import bcrypt from "bcrypt";

export class UserService extends BaseService {
  private userRepository = new UserRepository();
  private loginAttemptService = new LoginAttemptService();

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

  async login(email: string, password: string, ipAddress?: string, userAgent?: string): Promise<{ user: IUser, token: string } | {failed:boolean, message:string, time:number} |null> {
    // Verificar se o usuário excedeu o limite de tentativas
    const maxAttempts = 5; // Número máximo de tentativas permitidas
    const timeWindowInMinutes = 15; // Janela de tempo para contar as tentativas
    const isBlocked = await this.loginAttemptService.hasExceededFailedAttempts(email, maxAttempts, timeWindowInMinutes);

    if (isBlocked) {
      // throw new Error("Muitas tentativas de login falhas. Tente novamente mais tarde.");
      return {failed:true, message:"Muitas tentativas de login falhas. Tente novamente mais tarde.", time:timeWindowInMinutes};
    }

    const user: IUser | null = await this.userRepository.login(email);

    // Verificar se o usuário existe e a senha está correta
    const success = user && (await bcrypt.compare(password, user.password));

    // Registrar a tentativa de login
    await this.loginAttemptService.recordLoginAttempt(
      user?.id, // ID do usuário, se existir
      email,
      !!success, // Sucesso ou falha
      ipAddress,
      userAgent
    );

    if (success && user) {
      const token = generateToken(user);
      return { user, token };
    }

    return null;
  }
}
