import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private userRepository = new UserRepository();

    async getUsers() {
        return await this.userRepository.findAll();
    }
}
