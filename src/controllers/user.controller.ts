import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService = new UserService();
  
  async existsByEmail(req: Request, res: Response): Promise<void> {
    //#swagger.tags = ['Users']
    try {
      const { email } = req.params;
      if (!email) {
        res.status(400).json({ error: "Email é obrigatório" });
        return;
      }
  
      const exists = await this.userService.existsByEmail(email);
      res.json({ exists });
    } catch (error) {
      res.status(500).json({ error: "Erro ao verificar email" });
    }
  }
  
}

