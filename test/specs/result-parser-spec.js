"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
let expect = chai.expect;
const result_parser_1 = require("../src/parser/result-parser");
describe("Result Parser", function () {
    it('should parse result row correctly', function () {
        const result = result_parser_1.parseResultRow('Result:2:3:1');
        expect(result).to.exist;
        expect(result.first).to.equal(2);
        expect(result.second).to.equal(3);
        expect(result.third).to.equal(1);
    });
});
//# sourceMappingURL=result-parser-spec.js.map