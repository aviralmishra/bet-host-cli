export interface IBetSelection {
  runnerNumbers: Array<number>;
}

export class BetSelection implements IBetSelection {
  runnerNumbers: Array<number>;

  constructor(runnerNumbers: Array<number>) {
    this.runnerNumbers = runnerNumbers;
  }
}