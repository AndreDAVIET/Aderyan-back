export class Marchand {
    id!: number;
    name!: string;
    ville!: string;
  
    constructor(input: Marchand) {
      Object.assign(this, input);
  }
  }