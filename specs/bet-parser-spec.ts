import * as chai from 'chai';
let expect = chai.expect;

import { IBet, Bet } from '../src/model/bet';

import { parseBetRow } from '../src/parser/bet-parser';

describe("Bet Parser", function () {
  it('should parse bet row correctly', function () {
    const bet: IBet = parseBetRow(1, 'Bet:W:1:3');
    expect(bet).to.exist;
    expect(bet.product.type).to.equal('W');
    expect(bet.selection.runnerNumbers[0]).to.equal(1);
    expect(bet.stake.amount).to.equal(3);
  });
});