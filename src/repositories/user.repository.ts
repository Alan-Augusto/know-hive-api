import pool from "../config/database";
import { User } from "../entities/user";

export class UserRepository {
    async existsByEmail(email: string): Promise<boolean> {
        const result = await pool.query("SELECT 1 FROM users WHERE email = $1", [email]);
        return result.rowCount > 0;
    }
}
