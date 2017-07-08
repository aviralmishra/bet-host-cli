export interface IResult {
  first: number;
  second: number;
  third: number;
}

export class Result implements IResult {
  first: number;
  second: number;
  third: number;

  constructor(first: number, second: number, third: number) {
    this.first = first;
    this.second = second;
    this.third = third;
  }
}