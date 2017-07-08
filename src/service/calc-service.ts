import * as _ from 'lodash';

import { IBet, Bet } from '.././model/bet';
import { IProduct, Product } from '.././model/product';
import { IBetSelection, BetSelection } from '.././model/selection';
import { IStake, Stake } from '.././model/stake';
import { IResult, Result } from '.././model/result';
import { IDividend, Dividend } from '.././model/dividend';
import { Rules } from '.././config/rules';

/**
 * Calculates dividends for the race
 *
 * @param bets All bets that are part of a race
 * @param result Final result of the race
 */
export function calculate(bets: Array<IBet>, result: IResult): Array<IDividend> {
  // Filter winners for each product type.
  const winners = filterWinners(bets, result);
  const winProductWinners = winners.winProductWinners,
    firstPlaceProductWinners = winners.firstPlaceProductWinners,
    secondPlaceProductWinners = winners.secondPlaceProductWinners,
    thirdPlaceProductWinners = winners.thirdPlaceProductWinners,
    exactaProductWinners = winners.exactaProductWinners;

  // Calculate total stakes.
  const pools = calculatePool(bets);
  const totalWinProductPool = pools.totalWinProductPool,
    totalPlaceProductPool = pools.totalPlaceProductPool,
    totalExactaProductPool = pools.totalExactaProductPool;

  const dividends: Array<IDividend> = [];
  const winProductYields = calculateYields(winProductWinners, totalWinProductPool),
    firstPlaceProductYields = calculateYields(firstPlaceProductWinners, totalPlaceProductPool / 3),
    secondPlaceProductYields = calculateYields(secondPlaceProductWinners, totalPlaceProductPool / 3),
    thirdPlaceProductYields = calculateYields(thirdPlaceProductWinners, totalPlaceProductPool / 3),
    exactaProductYields = calculateYields(exactaProductWinners, totalExactaProductPool);

  if (!_.isEmpty(winProductWinners)) {
    dividends.push(new Dividend(winProductWinners[0].product, winProductWinners[0].selection, winProductYields));
  }

  if (!_.isEmpty(firstPlaceProductWinners)) {
    dividends.push(new Dividend(firstPlaceProductWinners[0].product, firstPlaceProductWinners[0].selection, firstPlaceProductYields));
  }
  if (!_.isEmpty(secondPlaceProductWinners)) {
    dividends.push(new Dividend(secondPlaceProductWinners[0].product, secondPlaceProductWinners[0].selection, secondPlaceProductYields));
  }

  if (!_.isEmpty(thirdPlaceProductWinners)) {
    dividends.push(new Dividend(thirdPlaceProductWinners[0].product, thirdPlaceProductWinners[0].selection, thirdPlaceProductYields));
  }
  if (!_.isEmpty(exactaProductWinners)) {
    dividends.push(new Dividend(exactaProductWinners[0].product, exactaProductWinners[0].selection, exactaProductYields));
  }

  // Return
  return dividends;
}

/**
 * Finds winning bets for each product type from the list of bets
 *
 * @param bets All bets that are part of a race
 * @param result Final result of the race
 */
function filterWinners(bets: Array<IBet>, result: IResult) {
  const winProductWinners = bets.filter((bet) => {
    return (bet.product.type === 'W') && (bet.selection.runnerNumbers[0] === result.first);
  });

  const firstPlaceProductWinners = bets.filter((bet) => {
    return (bet.product.type === 'P') && (bet.selection.runnerNumbers[0] === result.first);
  });

  const secondPlaceProductWinners = bets.filter((bet) => {
    return (bet.product.type === 'P') && (bet.selection.runnerNumbers[0] === result.second);
  });

  const thirdPlaceProductWinners = bets.filter((bet) => {
    return (bet.product.type === 'P') && (bet.selection.runnerNumbers[0] === result.third);
  });

  const exactaProductWinners = bets.filter((bet) => {
    return (bet.product.type === 'E') &&
      (bet.selection.runnerNumbers[0] === result.first) &&
      (bet.selection.runnerNumbers[1] === result.second);
  });

  return {
    winProductWinners,
    firstPlaceProductWinners,
    secondPlaceProductWinners,
    thirdPlaceProductWinners,
    exactaProductWinners
  };
}

/**
 * Calculates total amount availabe in each of the pools
 *
 * @param bets All bets that are part of a race
 */
function calculatePool(bets: Array<IBet>) {
  let totalWinProductPool = 0,
    totalPlaceProductPool = 0,
    totalExactaProductPool = 0;

  bets.forEach((bet) => {
    switch (bet.product.type) {
      case 'W':
        totalWinProductPool += bet.stake.amount;
        break;
      case 'P':
        totalPlaceProductPool += bet.stake.amount;
        break;
      case 'E':
        totalExactaProductPool += bet.stake.amount;
        break;
      default:
        break;
    }
  });

  totalWinProductPool -= (totalWinProductPool * (Rules.CORP_COMMISSION_WIN / 100));
  totalPlaceProductPool -= (totalPlaceProductPool * (Rules.CORP_COMMISSION_PLACE / 100));
  totalExactaProductPool -= (totalExactaProductPool * (Rules.CORP_COMMISSION_EXACTA / 100));

  return {
    totalWinProductPool,
    totalPlaceProductPool,
    totalExactaProductPool
  };
}

/**
 * Calculates yields based on total amount vs winning bets
 *
 * @param winningBets All winning bets for a product type
 * @param poolTotal Total amount availabe in the pool for the product type
 */
function calculateYields(winningBets: Array<IBet>, poolTotal: number): number {
  const winningBetsSum = _.reduce(winningBets, (winningBetsSum, winningBet) => {
    return winningBetsSum + winningBet.stake.amount;
  }, 0);

  return Math.round((poolTotal / winningBetsSum) * 100) / 100;
}

