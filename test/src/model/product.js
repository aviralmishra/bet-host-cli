"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(type) {
        this.type = type;
        switch (this.type) {
            case 'W':
                this.title = 'Win';
                break;
            case 'P':
                this.title = 'Place';
                break;
            case 'E':
                this.title = 'Exacta';
                break;
            default:
                break;
        }
    }
}
exports.Product = Product;
//# sourceMappingURL=product.js.map