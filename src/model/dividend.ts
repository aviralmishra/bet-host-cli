import { IProduct, Product } from './product';
import { IBetSelection, BetSelection } from './selection';
import { IStake, Stake } from './stake';

export interface IDividend {
  product: IProduct;
  selection: IBetSelection;
  yields: number;
}

export class Dividend implements IDividend {
  product: IProduct;
  selection: IBetSelection;
  yields: number;

  constructor(product: IProduct, selection: IBetSelection, yields: number) {
    this.product = product;
    this.selection = selection;
    this.yields = yields;
  }
}