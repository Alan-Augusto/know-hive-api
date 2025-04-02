import bcrypt from 'bcrypt';
import pool from "../config/database";

export class LoginAttemptRepository {
    async recordLoginAttempt(userId: string | undefined, email: string, success: boolean, ipAddress?: string, userAgent?: string, qtdAttemptsToBlock: number = 5, timeToBlock: number = 15): Promise<void> {
        // Primeiro, verifica se as últimas tentativas de login fracassadas 
        // excedem o limite dentro da janela de tempo
        let blocksLogin = false;
        
        if (!success) {
            // Conta quantas tentativas falhas ocorreram no período especificado
            const recentFailedAttemptsQuery = `
                SELECT COUNT(*) AS recent_failures
                FROM login_attempts
                WHERE email = $1 
                AND success = false 
                AND attempted_at > NOW() - INTERVAL '${timeToBlock} minutes'
            `;
            
            const recentFailuresResult = await pool.query(recentFailedAttemptsQuery, [email]);
            const recentFailures = parseInt(recentFailuresResult.rows[0].recent_failures, 10);
            
            // Se já existirem qtdAttemptsToBlock-1 falhas (contando esta nova como a última)
            // então esta tentativa bloqueará o login
            blocksLogin = recentFailures >= qtdAttemptsToBlock - 1;
        }
        
        // Insere o registro da tentativa com o valor apropriado para blocks_login
        const query = `
          INSERT INTO login_attempts (user_id, email, success, ip_address, user_agent, blocks_login)
          VALUES ($1, $2, $3, $4, $5, $6)
        `;
        
        const values = [
            userId || null, 
            email, 
            success, 
            ipAddress || null, 
            userAgent || null,
            blocksLogin
        ];
        
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

    async getLastFailedAttemptTime(email: string): Promise<Date | null> {
        const query = `
          SELECT attempted_at 
          FROM login_attempts 
          WHERE email = $1 AND success = false 
          ORDER BY attempted_at DESC 
          LIMIT 1
        `;
        const result = await pool.query(query, [email]);
        return result.rowCount > 0 ? result.rows[0].attempted_at : null;
    }
    
    async isLoginBlocked(email: string, timeWindowInMinutes: number): Promise<boolean> {
        const query = `
          SELECT EXISTS(
            SELECT 1 FROM login_attempts
            WHERE email = $1 
            AND blocks_login = true 
            AND attempted_at > NOW() - INTERVAL '${timeWindowInMinutes} minutes'
          ) AS is_blocked
        `;
        const result = await pool.query(query, [email]);
        return result.rows[0].is_blocked;
    }
}
