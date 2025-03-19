import { Router } from 'express';
import { QuestionService } from '../services/question.service';

const router = Router();
const questionService = new QuestionService();

router.get('/', (req, res) => {
    // #swagger.tags = ['Users']
    
});

export default router;
