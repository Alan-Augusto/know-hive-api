import pool from "../config/database";
import { User } from "../entities/user";

export class UserRepository {
    async findAll(): Promise<User[]> {
        const result = await pool.query("SELECT * FROM users");
        return result.rows;
    }

    async findById(id: number): Promise<User | null> {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        return result.rows[0] || null;
    }
}
