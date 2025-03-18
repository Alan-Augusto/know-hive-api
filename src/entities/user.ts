export class User {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    profile_picture_url!: string;
    created_at!: Date;
  
    constructor(user?: Partial<User>) {
      Object.assign(this, user);
    }
  }
  