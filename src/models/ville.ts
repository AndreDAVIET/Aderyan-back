export class Ville {
    id!: number;
    name!: string;
    distance!: string;
  
    constructor(input: Ville) {
      Object.assign(this, input);
  }
  }