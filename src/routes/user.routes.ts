import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Endpoints relacionados a usuários
 */

/**
 * @swagger
 * /users/existsByEmail/{email}:
 *   get:
 *     summary: Verifica se um usuário existe pelo e-mail
 *     description: Retorna um booleano indicando se o e-mail já está cadastrado no sistema.
 *     tags:
 *       - Users
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
router.get("/existsByEmail/:email", userController.existsByEmail.bind(userController));


export default router;
