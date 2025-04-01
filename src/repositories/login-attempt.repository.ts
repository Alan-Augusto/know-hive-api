import bcrypt from 'bcrypt';
import pool from "../config/database";

export class LoginAttemptRepository {
    async recordLoginAttempt(userId:string|undefined, email: string, success: boolean, ipAddress?: string, userAgent?: string): Promise<void> {
        const query = `
          INSERT INTO login_attempts (user_id, email, success, ip_address, user_agent)
          VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [userId||null, email, success, ipAddress || null, userAgent || null];
        await pool.query(query, values);
      }
}
