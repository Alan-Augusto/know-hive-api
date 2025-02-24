import { Router } from "express";
import { QuestionController } from "../controllers/question.controller";

const router = Router();
const questionController = new QuestionController();

/**
 * @swagger
 * tags:
 *   - name: Questions
 *     description: Endpoints relacionados a questões
 */

/**
 * @swagger
 * /Questions/getAllQuestions/{email}:
 *   get:
 *     summary: Verifica se um usuário existe pelo e-mail
 *     description: Retorna um booleano indicando se o e-mail já está cadastrado no sistema.
 *     tags:
 *       - Questions
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: E-mail do usuário a ser verificado.
 *     responses:
 *       200:
 *         description: Retorna um booleano indicando se o e-mail existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *       400:
 *         description: Requisição inválida (por exemplo, e-mail mal formatado).
 *       500:
 *         description: Erro interno do servidor.
 */

router.get("/", questionController.getAllQuestions.bind(questionController));

export default router;
