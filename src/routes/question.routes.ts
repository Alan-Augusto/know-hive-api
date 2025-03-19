import { Router } from 'express';
import { QuestionController } from '../controllers/question.controller';

const router = Router();
const questionController = new QuestionController();


router.get('/', (req, res) => {
    // #swagger.tags = ['Users']
    questionController.getAllQuestions(req, res);
});

export default router;
