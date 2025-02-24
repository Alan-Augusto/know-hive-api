export class Question {
    id!: number;
    title!: string;
    description!: string;
    userId!: number;
  
    constructor(question?: Partial<Question>) {
      Object.assign(this, question);
    }
  }
  