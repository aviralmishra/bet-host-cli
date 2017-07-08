'use strict';

import * as _ from 'lodash';
import * as readline from 'readline';

import { IBet, Bet } from './model/bet';
import { IResult, Result } from './model/result';
import { IDividend, Dividend } from './model/dividend';

import { parseBetRow } from './parser/bet-parser';
import { parseResultRow } from './parser/result-parser';
import { calculate } from './service/calc-service';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const inputs: Array<string> = [];
const bets: Array<IBet> = [];
let betId = 1;


rl.setPrompt('tc_tote_bet_host> ');
rl.prompt();

rl.on('line', function (line: string) {
  if (line) {
    try {
      if (line.startsWith('Bet')) {
        const bet = parseBetRow(++betId, line);
        bets.push(<IBet>bet);
      } else if (line.startsWith('Result')) {
        const result = parseResultRow(line);

        console.info('\nReceived input. Calculating dividends...');
        processInput(bets, result);

        console.info('\nThe dividends are calculated successfully. Exiting.');
        rl.close();
      } else {
        throw new Error('Row could not be identified as Bet or Result.');
      }

      // Keep track of input data for audit purposes if required.
      inputs.push(line);
    } catch (error) {
      const message = error && error[0] ? error[0] : 'Invalid row.';
      console.error(`Ignoring row: ${line}. ${message}`);
    }
  }
}).on('close', function () {
  process.exit(0);
});

function processInput(bets: Array<IBet>, result: IResult) {
  try {
    if (_.isEmpty(bets) || _.isNull(result)) {
      throw new Error(`Insufficient data. Bets: ${bets.length}, Result: ${result}`);
    } else {
      const dividends: Array<IDividend> = calculate(bets, result);

      console.info('\nThe dividends are:');
      dividends.forEach((dividend) => {
        console.info(`${dividend.product.title}:${dividend.selection.runnerNumbers.toString()}:$${dividend.yields}`);
      });
    }
  } catch (error) {
    const message = error ? error : 'An error occurred while calculating dividends.';
    console.error(message);
  }
}