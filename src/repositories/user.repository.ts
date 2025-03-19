import pool from "../config/database";
import { IUser } from "../entities/user";

export class UserRepository {
    async existsByEmail(email: string): Promise<boolean> {
        const result = await pool.query("SELECT 1 FROM users WHERE email = $1", [email]);
        console.log(result.rowCount);
        return result.rowCount > 0;
    }

    async register(user: IUser): Promise<IUser> {
        const result = await pool.query(
            "INSERT INTO users (name, email, password, profile_picture_url, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [user.name, user.email, user.password, user.profile_picture_url, new Date()]
        );
        return result.rows[0] as IUser;
    }
}
