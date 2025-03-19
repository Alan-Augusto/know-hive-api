import { IUser } from "../entities/user";
import { UserRepository } from "../repositories/user.repository";
import { isValueValid, processReturn, resultError } from "../utils/returns";
import { BaseService } from "./base.service";

export class UserService extends BaseService{
    private userRepository = new UserRepository();
    
    async existsByEmail(email: string) {
        const resultEmailCheck = await this.userRepository.existsByEmail(email);

        if(isValueValid(resultEmailCheck)) {
            console.log("isValueValid", resultEmailCheck);
            return processReturn(resultEmailCheck, "Email já existe", "Email não existe");
        }
        else{
            return resultError("Erro ao verificar email");
        }
    }

    async register(user:IUser) {
        const resultEmailCheck = await this.existsByEmail(user.email);

        if(resultEmailCheck.result != null) {
            return resultError("Usuário já cadastrado");
        }
        else{
            return processReturn(
                await this.userRepository.register(user), 
                "Usuário cadastrado com sucesso", 
                "Erro ao cadastrar usuário"
            );
        }
    }
}
