import * as fs from "fs";
import { join } from "path";
import CustomError from "../../../utils/CustomError.js";
import getDTO from "../../DTOs/ProductDTO.js";
import configData from "../../../configDB.js";

const { productsFile } = configData.fileSystem;
const FILE_PATH = join(process.cwd(), "data/");
const FILE = FILE_PATH.concat(productsFile);

class ProductsDAOFilesystem {
  async persist(array = []) {
    const fileContent = JSON.stringify(array, null, 2);

    if (!fs.existsSync(FILE_PATH)) fs.promises.mkdir(FILE_PATH);
    return fs.promises.writeFile(FILE, fileContent);
  }

  async checkExistence() {
    const exist = fs.existsSync(FILE);
    if (!exist) await this.persist();
  }

  async getAll() {
    try {
      await this.checkExistence();

      const fileContent = await fs.promises.readFile(FILE);
      const products = JSON.parse(fileContent);
      return getDTO(products);
    } catch (error) {
      throw new CustomError(500, "error al obtener todos los productos", error);
    }
  }

  async getById(id) {
    try {
      await this.checkExistence();

      const content = await this.getAll();
      const product = content.find((entry) => entry.id === parseInt(id));

      if (!product)
        throw new CustomError(404, "producto no encontrado", { id });

      return getDTO(product);
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? `error al obtener el producto con id ${id}`,
        error.error ?? error
      );
    }
  }

  async save(product) {
    try {
      await this.checkExistence();

      const content = await this.getAll();
      const id = content.length ? content[content.length - 1].id + 1 : 1;
      const newProduct = { ...product, id };

      content.push(newProduct);

      await this.persist(content);

      return getDTO(newProduct);
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? "error al guardar producto",
        error.error ?? error
      );
    }
  }

  async updateById(id, product) {
    try {
      await this.checkExistence();

      const content = await this.getAll();
      const index = content.findIndex((product) => product.id === parseInt(id));

      if (index === -1)
        throw new CustomError(404, "producto no encontrado", { id });

      const newProduct = { ...product, id: parseInt(id) };
      content[index] = newProduct;

      await this.persist(content);

      return getDTO(newProduct);
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? `error al actualizar el producto con id ${id}`,
        error.error ?? error
      );
    }
  }

  async deleteById(id) {
    try {
      await this.checkExistence();

      const content = await this.getAll();
      const product = content.find((product) => product.id === parseInt(id));

      if (!product)
        throw new CustomError(404, "producto no encontrado", { id });

      const filteredContent = content.filter(
        (product) => product.id !== parseInt(id)
      );
      await this.persist(filteredContent);

      return getDTO(product);
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? `error al eliminar el producto con id ${id}`,
        error.error ?? error
      );
    }
  }
}

export default ProductsDAOFilesystem;
