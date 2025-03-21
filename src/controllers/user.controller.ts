import { Router } from "express";
import { UserService } from "../services/user.service";
import { User } from "../entities/user";
import { sendError, sendSuccess } from "../utils/returns.utils";

const router = Router();
const userService = new UserService();

router.get("/existsByEmail/:email", async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to check if the email exists in the database.'
    const { email } = req.params;
    try {
        const exists = await userService.existsByEmail(email);
        const message = exists ? "Email já cadastrado" : "Email não cadastrado";
        sendSuccess(res, message, exists);
    } catch (error) {
        sendError(res, "Erro ao verificar email");
    }
        
});

router.post("/register", async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to register a user.'
    // #swagger.parameters['body'] = { in: 'body', description: 'Dados do usuário.' }
    // try {
    //     const { email, password, name, profile_picture_url } = req.body;
    //     const user = new User({ email, password, name, profile_picture_url });

    //     const result = await userService.register(user.getValues());
    //     if (result === null) {
    //         res.status(400).json(resultError("Usuário já cadastrado"));
    //     }
    //     res.json(resultSuccess("Usuário cadastrado com sucesso", result));
    // } catch (error) {
    //     res.status(500).json(resultError("Erro ao registrar usuário"));
    // }
    const { email, password, name, profile_picture_url } = req.body;
    const user = new User({ email, password, name, profile_picture_url });

    user.handleValidation(res,'Usuario inválido');

    try {
        const result = await userService.register(user.getValues());
        if (result === null) {
            return sendError(res, "Usuário já cadastrado", 400);
        }
        sendSuccess(res, "Usuário cadastrado com sucesso", result);
    } catch (error) {
        sendError(res, "Erro ao registrar usuário");
    }
});

export default router;