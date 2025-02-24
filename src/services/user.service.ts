import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private userRepository = new UserRepository();
    
    async existsByEmail(email: string) {
        return await this.userRepository.existsByEmail(email);
    }
}
