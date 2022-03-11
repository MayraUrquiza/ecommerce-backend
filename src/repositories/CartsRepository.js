import { Cart } from "../models/Cart.js";
import { CartProduct } from "../models/CartProduct.js";
import CartsDAOFactory from "../persistence/DAOs/factories/CartsDAO.js";
import getDTO from "../persistence/DTOs/CartDTO.js";
import getCartProductDTO from "../persistence/DTOs/CartProductDTO.js";

class CartsRepository {
  constructor() {
    this.dao = CartsDAOFactory.getDAO();
  }

  async getCarts() {
    const carts = await this.dao.getCarts();
    return carts.map((product) => new Cart(product));
  }

  async getCartById(id) {
    const cart = await this.dao.getCartById(id);
    return new Cart(cart);
  }

  async getProductsByCartId(id) {
    const cart = await this.getCartById(id);
    return cart.products.map(
      (product) =>
        new CartProduct({ ...product, id: product._id || product.id })
    );
  }

  async createCart(cart) {
    return await this.dao.createCart(getDTO(cart));
  }

  async updateProductsByCartId(id, products) {
    return await this.dao.updateProductsByCartId(id, getCartProductDTO(products));
  }

  async deleteCartById(id) {
    const cart = await this.dao.deleteCartById(id);
    return new Cart(cart);
  }

  async deleteCartByUserId(id) {
    const cart = await this.dao.deleteCartByUserId(id);
    return new Cart(cart);
  }
}

export default CartsRepository;
