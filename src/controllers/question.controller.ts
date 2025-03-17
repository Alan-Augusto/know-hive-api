import { Request, Response } from "express";
import { ApiDescription, ApiParam } from "../decorators/swagger";

export class QuestionController {
  @ApiDescription("Obtém todas as questões")
  @ApiParam("x", "string")
  async getAllQuestions(req: Request, res: Response) {
    // method implementation
  }
}
