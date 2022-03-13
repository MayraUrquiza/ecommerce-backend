import ProductsRepository from "../repositories/ProductsRepository.js";
import CustomError from "../utils/CustomError.js";
import logger from "../utils/Logger.js";

class ProductsService {
  constructor() {
    this.repository = new ProductsRepository();
  }

  async getProducts() {
    logger.info("Consultando productos");
    return await this.repository.getAll();
  }

  async getProductById(id) {
    this.validateId(id);
    logger.info(`Buscando producto con id ${id}`);
    return await this.repository.getById(id);
  }

  async saveProduct(data) {
    this.validateData(data);
    logger.info("Creando producto");
    return await this.repository.save(data);
  }

  async updateProduct(id, data) {
    this.validateId(id);
    this.validateData(data);
    logger.info(`Actualizando producto con id ${id}`);
    return await this.repository.updateById(id, data);
  }

  async deleteProduct(id) {
    this.validateId(id);
    logger.info(`Eliminando producto con id ${id}`);
    return await this.repository.deleteById(id);
  }

  validateId(id) {
    if (!id) throw new CustomError(400, "el parámetro id es necesario");
  }

  validateData(data) {
    if (!data.name)
      throw new CustomError(400, "el parámetro name es necesario");
    if (!data.description)
      throw new CustomError(400, "el parámetro description es necesario");
    if (!data.code)
      throw new CustomError(400, "el parámetro code es necesario");
    if (!data.price)
      throw new CustomError(400, "el parámetro price es necesario");
    if (!data.thumbnail)
      throw new CustomError(
        400,
        "el parámetro thumbnail es necesario, puede ser una imagen o link a una imagen"
      );
    if (!data.stock)
      throw new CustomError(400, "el parámetro stock es necesario");
  }
}

export default ProductsService;
