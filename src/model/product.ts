export interface IProduct {
  type: string;
  title: string;
}

export class Product implements IProduct {
  type: string;
  title: string;

  constructor(type: string) {
    this.type = type;

    switch (this.type) {
      case 'W':
        this.title = 'Win';
        break;
      case 'P':
        this.title = 'Place';
        break;
      case 'E':
        this.title = 'Exacta';
        break;
      default:
        break;
    }
  }
}