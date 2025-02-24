export class User {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
  
    constructor(user?: Partial<User>) {
      Object.assign(this, user);
    }
  }
  