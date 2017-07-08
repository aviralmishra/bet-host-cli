export interface IStake {
  amount: number;
}

export class Stake implements IStake {
  amount: number;

  constructor(type: number) {
    this.amount = type;
  }
}