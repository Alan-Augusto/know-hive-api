import { Request, Response } from "express";
import { QuestionService } from "../services/question.service";
import { ApiDoc } from "../decorators/apiDoc";
import { Question } from "../entities/question";

export class QuestionController {
  private questionService = new QuestionService();

  @ApiDoc({
    method: "get",
    path: "/questions",
    description: "Retorna todas as questões cadastradas.",
    output: Question, // ✅ FUNCIONA!
  })
  async getAllQuestions(req: Request, res: Response) {
    const questions = await this.questionService.getQuestions();
    res.json(questions);
  }
}
