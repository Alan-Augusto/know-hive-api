import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { ApiDoc } from "../decorators/apiDoc";
import { User } from "../entities/user"; // Agora `User` é uma classe!

export class UserController {
  private userService = new UserService();

  @ApiDoc({
    method: "get",
    path: "/users",
    description: "Retorna todos os usuários cadastrados.",
    output: User, // ✅ AGORA FUNCIONA! 
  })
  async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getUsers();
    res.json(users);
  }
}
