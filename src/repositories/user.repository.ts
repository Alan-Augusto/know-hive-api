import bcrypt from 'bcrypt';
import pool from "../config/database";
import { IUser } from "../entities/user";

export class UserRepository {
    async existsByEmail(email: string): Promise<boolean> {
        const result = await pool.query("SELECT 1 FROM users WHERE email = $1", [email]);
        return result.rowCount > 0;
    }

    async register(user: IUser): Promise<IUser> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const result = await pool.query(
            "INSERT INTO users (name, email, password, profile_picture_url, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [user.name, user.email, hashedPassword, user.profile_picture_url, new Date()]
        );
        return result.rows[0] as IUser;
    }

    async login(email: string, password: string): Promise<IUser | null> {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (result.rowCount === 0) return null;

        const user = result.rows[0] as IUser;

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return null;

        return user;
    }
}
