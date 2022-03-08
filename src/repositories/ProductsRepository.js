import { Product } from "../models/product.js";
import ProductsDAOFactory from "../persistence/DAOs/factories/ProductsDAO.js";
import getDTO from "../persistence/DTOs/ProductDTO.js";

class ProductsRepository {
  constructor() {
    this.dao = ProductsDAOFactory.getDAO();
  }

  async getAll() {
    const products = await this.dao.getAll();
    return products.map(product => new Product(product));
  }

  async getById(id) {
    const product = await this.dao.getById(id);
    return new Product(product);
  }

  async save(product) {
    return await this.dao.save(getDTO(product));
  }

  async updateById(id, product) {
    return await this.dao.updateById(id, getDTO(product));
  }

  async deleteById(id) {
    const product = await this.dao.deleteById(id);
    return new Product(product);
  }
}

export default ProductsRepository;
