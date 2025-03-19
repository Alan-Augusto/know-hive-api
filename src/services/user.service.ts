import { IUser } from "../entities/user";
import { UserRepository } from "../repositories/user.repository";
import { BaseService } from "./base.service";

export class UserService extends BaseService{
    private userRepository = new UserRepository();
    
    async existsByEmail(email: string) {
        return this.processReturn(
            await this.userRepository.existsByEmail(email),
            "Email já cadastrado",
            "Email disponível"
        );
    }

    async register(user:IUser) {
        const resultEmailCheck = await this.existsByEmail(user.email);

        console.log(resultEmailCheck);
        
        if(resultEmailCheck.result == true) {
            return this.error("Usuário já cadastrado");
        }
        else{
            return this.processReturn(
                await this.userRepository.register(user), 
                "Usuário cadastrado com sucesso", 
                "Erro ao cadastrar usuário"
            );
        }
    }
}
