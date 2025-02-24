import { QuestionRepository } from "../repositories/question.repository";

export class QuestionService {
    private questionRepository = new QuestionRepository();

    async getQuestions() {
        return await this.questionRepository.findAll();
    }
}
