"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const bet_1 = require(".././model/bet");
const product_1 = require(".././model/product");
const selection_1 = require(".././model/selection");
const stake_1 = require(".././model/stake");
/**
 * Utility function to parse line and create <code>IBet</code>.
 * Throws any errors for caller to handle.
 *
 * @param id Auto-generated bet id
 * @param line Bet record
 */
function parseBetRow(id, line) {
    const parts = line.split(':');
    try {
        // Parse line.
        const product = new product_1.Product(parts[1]);
        const selection = new selection_1.BetSelection(parts[2].split(',').map((item) => parseInt(item, 10)));
        const stake = new stake_1.Stake(parseInt(parts[3], 10));
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
        return new bet_1.Bet(id, product, selection, stake);
    }
    catch (error) {
        const msg = error ? error : line + ' is not entered in required format.';
        throw new Error(msg);
    }
}
exports.parseBetRow = parseBetRow;
//# sourceMappingURL=bet-parser.js.map