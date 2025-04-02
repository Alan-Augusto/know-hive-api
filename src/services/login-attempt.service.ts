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

  async getTimeUntilNextAttempt(email: string, timeWindowInMinutes: number): Promise<number> {
    const lastAttemptTime = await this.loginAttemptRepository.getLastFailedAttemptTime(email);

    console.log("ULTIMA TENTATIVA", lastAttemptTime)
    console.log("TIME NOW", new Date())
    
    if (!lastAttemptTime) return 0;
    
    const now = new Date();
    const blockEndTime = new Date(lastAttemptTime);
    blockEndTime.setMinutes(blockEndTime.getMinutes() + timeWindowInMinutes);
    
    // Calculate remaining minutes
    const remainingMs = blockEndTime.getTime() - now.getTime();
    
    // Convert to minutes and ensure it doesn't exceed the time window
    const remainingMinutes = Math.min(
      Math.ceil(remainingMs / (1000 * 60)),
      timeWindowInMinutes
    );
    
    return Math.max(0, remainingMinutes); // Return at least 0 (not negative values)
  }
}
