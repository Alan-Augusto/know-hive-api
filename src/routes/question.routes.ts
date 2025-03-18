import { Router } from 'express';
import { QuestionController } from '../controllers/question.controller';

const router = Router();
const questionController = new QuestionController();


router.get('/', questionController.getAllQuestions.bind(questionController));

export default router;
