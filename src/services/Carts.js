import { CartProduct } from "../models/CartProduct.js";
import UserModel from "../models/User.js";
import CartsRepository from "../repositories/CartsRepository.js";
import ProductsRepository from "../repositories/ProductsRepository.js";
import CustomError from "../utils/CustomError.js";

class CartsService {
  constructor() {
    this.cartsRepository = new CartsRepository();
    this.productsRepository = new ProductsRepository();
  }

  async getCarts() {
    return await this.cartsRepository.getCarts();
  }

  async getCartById(id) {
    this.validateId(id);
    return await this.cartsRepository.getCartById(id);
  }

  async saveCart(data) {
    // this.validateUserId(data.user);
    return await this.cartsRepository.createCart(data);
  }

  async deleteCartById(id) {
    this.validateId(id);
    return await this.cartsRepository.deleteCartById(id);
  }

  async getProductsInCart(id) {
    return await this.cartsRepository.getProductsByCartId(id);
  }

  async saveProductInCart(id, productId) {
    this.validateId(id);
    this.validateProductId(productId);

    const products = await this.getProductsInCart(id);
    const oldProduct = await this.productsRepository.getById(productId);

    const product = await this.productsRepository.updateById(productId, {
      ...oldProduct,
      stock: oldProduct.stock - 1,
    });

    const index = products.findIndex(
      (product) => product.id.toString() === productId.toString()
    );

    if (index !== -1) {
      products[index].quantity = products[index].quantity + 1;
      products[index].stock = product.stock;
    } else products.push(new CartProduct(product));

    return await this.cartsRepository.updateProductsByCartId(id, products);
  }

  async deleteProductInCart(id, productId) {
    this.validateId(id);
    this.validateProductId(productId);

    const products = await this.getProductsInCart(id);

    const filteredProducts = [];
    for (const product of products) {
      if (product.id.toString() !== productId.toString())
        filteredProducts.push(product);
      else if (product.quantity > 1)
        filteredProducts.push({ ...product, quantity: product.quantity - 1 });
    }

    return await this.cartsRepository.updateProductsByCartId(
      id,
      filteredProducts
    );
  }

  validateId(id) {
    if (!id) throw new CustomError(400, "el parámetro id es necesario");
  }

  validateProductId(id) {
    if (!id) throw new CustomError(400, "el parámetro productId es necesario");
  }

  async validateUserId(id) {
    if (!id) throw new CustomError(400, "el parámetro user es necesario");

    // TODO: corregir porque no va a funcionar así para firestore y archivos
    // userDao.findUserById
    const user = await UserModel.findById(id);
    if (!user)
      throw new CustomError(404, `no existe ningún usuario con el id ${id}`);
  }
}

export default CartsService;
