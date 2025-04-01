import bcrypt from 'bcrypt';
import pool from "../config/database";

export class LoginAttemptRepository {
    async recordLoginAttempt(userId: string | undefined, email: string, success: boolean, ipAddress?: string, userAgent?: string): Promise<void> {
        const query = `
          INSERT INTO login_attempts (user_id, email, success, ip_address, user_agent)
          VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [userId || null, email, success, ipAddress || null, userAgent || null];
        await pool.query(query, values);
    }

    async countFailedAttempts(email: string, timeWindowInMinutes: number): Promise<number> {
        const query = `
          SELECT COUNT(*) AS failed_attempts
          FROM login_attempts
          WHERE email = $1 AND success = false AND attempted_at > NOW() - INTERVAL '${timeWindowInMinutes} minutes'
        `;
        const result = await pool.query(query, [email]);
        return parseInt(result.rows[0].failed_attempts, 10);
    }
}
