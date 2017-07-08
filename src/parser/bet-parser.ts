import * as _ from 'lodash';

import { IBet, Bet } from '.././model/bet';
import { IProduct, Product } from '.././model/product';
import { IBetSelection, BetSelection } from '.././model/selection';
import { IStake, Stake } from '.././model/stake';

/**
 * Utility function to parse line and create <code>IBet</code>.
 * Throws any errors for caller to handle.
 *
 * @param id Auto-generated bet id
 * @param line Bet record
 */
export function parseBetRow(id: number, line: string): IBet {
  const parts: Array<string> = line.split(':');

  try {
    // Parse line.
    const product: IProduct = new Product(parts[1]);
    const selection: IBetSelection = new BetSelection(parts[2].split(',').map((item) => parseInt(item, 10)));
    const stake: IStake = new Stake(parseInt(parts[3], 10));

    // Run validations.
    if (_.isNull(product.type) ||
      !_.includes(['W', 'P', 'E'], product.type) ||
      _.isEmpty(selection.runnerNumbers) ||
      selection.runnerNumbers.length > 2 ||
      selection.runnerNumbers.some(isNaN) ||
      _.isNull(stake.amount) ||
      stake.amount <= 0) {
      throw new Error('Bet ' + line + ' is not entered in required format.');
    }

    // Return bet.
    return new Bet(id, product, selection, stake);

  } catch (error) {
    const msg = error ? error : line + ' is not entered in required format.';
    throw new Error(msg);
  }
}