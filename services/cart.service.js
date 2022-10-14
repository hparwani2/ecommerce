let db = require("../models/index");
 
class CartService {
    constructor() {
        this.schema = db.cart;
    }

    createCart(cart) {
        return this
        .schema
        .create(cart);
    }

    getCartById(id) {
        return this
        .schema
        .findByPk(id);
    }
}

let cartService = new CartService();
module.exports = { cartService };