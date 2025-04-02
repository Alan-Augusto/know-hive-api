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
    if (!email) return sendError(res, "Email não informado", 400);

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

router.post("/login", async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to authenticate a user.'
    const { email, password, user_agent } = req.body;
    if(!email || !password) return sendError(res, "Email e senha são obrigatórios", 400);
    try {
        const result = await userService.login(email, password, req.ip, user_agent);
        if (result && 'failed' in result && result.failed) {
            return sendSuccess(res, result.message, result);
        }
        if (!result) {
            return sendError(res, "Credenciais inválidas", 401);
        }
        else if(result && 'token' in result){
            sendSuccess(res, "Login realizado com sucesso", result);
        }
        else{
            sendError(res, "Erro ao realizar login");
        }
    } catch (error) {
        console.log(error);
        sendError(res, "Erro ao realizar login");
    }
});


export default router;