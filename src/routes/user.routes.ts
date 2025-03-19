import { Router } from "express";
import { UserService } from "../services/user.service";

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

export default router;


// NÃO SEI SE ISSO ESTÁ CERTO, MAS IMAGINO A CONTROLLER ASSIM...
