import { IUser } from "../entities/user";
import { LoginAttemptRepository } from "../repositories/login-attempt.repository";
import { UserRepository } from "../repositories/user.repository";
import { generateToken } from "../utils/authorization.util";
import { BaseService } from "./base.service";

export class LoginAttemptService extends BaseService {
  private loginAttemptRepository = new LoginAttemptRepository();

  async recordLoginAttempt(userId: string | undefined, email: string, success: boolean, ipAddress?: string, userAgent?: string): Promise<void> {
    await this.loginAttemptRepository.recordLoginAttempt(userId, email, success, ipAddress, userAgent);
  }

  async hasExceededFailedAttempts(email: string, maxAttempts: number, timeWindowInMinutes: number): Promise<boolean> {
    const failedAttempts = await this.loginAttemptRepository.countFailedAttempts(email, timeWindowInMinutes);
    console.log(`Failed attempts for ${email}: ${failedAttempts}`);
    return failedAttempts >= maxAttempts;
  }
}
