import { IProduct, Product } from './product';
import { IBetSelection, BetSelection } from './selection';
import { IStake, Stake } from './stake';

export interface IBet {
  id: number;
  product: IProduct;
  selection: IBetSelection;
  stake: IStake;
}

export class Bet implements IBet {
  id: number;
  product: IProduct;
  selection: IBetSelection;
  stake: IStake;

  constructor(id: number, product: IProduct, selection: IBetSelection, stake: IStake) {
    this.id = id;
    this.product = product;
    this.selection = selection;
    this.stake = stake;
  }
}