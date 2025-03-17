import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { ApiDescription, ApiParam } from "../decorators/swagger";

export class UserController {
  private userService = new UserService();
  
  @ApiDescription("Verifica se um usuário existe pelo e-mail")
  @ApiParam("email", "string")
  async existsByEmail(req: Request, res: Response): Promise<void> {
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

