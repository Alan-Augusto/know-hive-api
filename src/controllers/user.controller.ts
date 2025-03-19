import { Router } from "express";
import { UserService } from "../services/user.service";
import { User } from "../entities/user";

const router = Router();
const userService = new UserService();

router.get("/existsByEmail/:email", async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to check if the email exists in the database.'
    try {
        const { email } = req.params;
        if (!email) {
            res.status(400).json({ error: "Email é obrigatório" });
            return;
        }
        const exists = await userService.existsByEmail(email);
        res.json({ exists });
    } catch (error) {
        res.status(500).json({ error: "Erro ao verificar email" });
    }
});

router.post("/register", async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to register a user.'
    /*#swagger.parameters['body'] = {
        in: 'body',
        description: 'Dados do usuário.'
    }
    */
    try {
        const { email, password, name, profile_picture_url } = req.body;

        const user = new User({ email, password, name, profile_picture_url });
        if(!user.valid()) {
            res.status(400).json({ error: user.error() });
        }

        const result = await userService.register(user.getValues());
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
});

export default router;


// NÃO SEI SE ISSO ESTÁ CERTO, MAS IMAGINO A CONTROLLER ASSIM...
