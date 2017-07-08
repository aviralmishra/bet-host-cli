"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
let expect = chai.expect;
const bet_parser_1 = require("../src/parser/bet-parser");
describe("Bet Parser", function () {
    it('should parse bet row correctly', function () {
        const bet = bet_parser_1.parseBetRow(1, 'Bet:W:1:3');
        expect(bet).to.exist;
        expect(bet.product.type).to.equal('W');
        expect(bet.selection.runnerNumbers[0]).to.equal(1);
        expect(bet.stake.amount).to.equal(3);
    });
});
//# sourceMappingURL=bet-parser-spec.js.map