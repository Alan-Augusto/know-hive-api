import { BaseEntity, IEntity } from "./entity.base";

export interface IUser extends IEntity {
  name: string;
  email: string;
  password: string;
  profile_picture_url?: string;
}

export class User extends BaseEntity<IUser> {
  constructor(user: IUser) {
    super(user); // Chama a classe base para realizar as validações
  }

  override isFieldRequired(field: string): boolean {
    return field != 'profile_picture_url';
  }
}
