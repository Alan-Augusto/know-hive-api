import pool from "../config/database";
import { Question } from "../entities/question";

export class QuestionRepository {
    async findAll(): Promise<Question[]> {
        const result = await pool.query("SELECT * FROM questions");
        return result.rows;
    }
}
