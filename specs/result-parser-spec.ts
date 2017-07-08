import * as chai from 'chai';
let expect = chai.expect;

import { IResult, Result } from '../src/model/result';

import { parseResultRow } from '../src/parser/result-parser';

describe("Result Parser", function () {
  it('should parse result row correctly', function () {
    const result: IResult = parseResultRow('Result:2:3:1');
    expect(result).to.exist;
    expect(result.first).to.equal(2);
    expect(result.second).to.equal(3);
    expect(result.third).to.equal(1);
  });
});