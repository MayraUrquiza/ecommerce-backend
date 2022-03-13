import CustomError from "../../../utils/CustomError.js";
import getDTO from "../../DTOs/CartDTO.js";
import configData from "../../../configDB.js";
import FileSystemDAO from "./FileSystemDAO.js";

const { cartsFile } = configData.fileSystem;

class CartsDAOFilesystem extends FileSystemDAO {
  constructor() {
    super(cartsFile);
  }

  async getCarts() {
    try {
      await this.checkExistence();

      const fileContent = await this.readFile();
      const carts = JSON.parse(fileContent);
      return getDTO(carts);
    } catch (error) {
      throw new CustomError(500, "error al obtener todos los carritos", error);
    }
  }

  async getCartById(id) {
    try {
      await this.checkExistence();

      const content = await this.getCarts();
      const cart = content.find((entry) => entry.id === parseInt(id));

      if (!cart) throw new CustomError(404, "carrito no encontrado", { id });

      return getDTO(cart);
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? `error al obtener el carrito con id ${id}`,
        error.error ?? error
      );
    }
  }

  async createCart(cart) {
    try {
      await this.checkExistence();

      const content = await this.getCarts();
      const id = content.length ? content[content.length - 1].id + 1 : 1;
      const newCart = { ...cart, id };

      content.push(newCart);

      await this.persist(content);

      return getDTO(newCart);
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? "error al crear carrito",
        error.error ?? error
      );
    }
  }

  /**
   * agregar, eliminar y actualizar producto en carrito
   * dependiendo de lo que venga en el parámetro products
   * @param {*} id
   * @param {*} products
   * @returns carrito actualizado
   */
  async updateProductsByCartId(id, products) {
    try {
      await this.checkExistence();

      const content = await this.getCarts();
      const index = content.findIndex((cart) => cart.id === parseInt(id));

      if (index === -1)
        throw new CustomError(404, "carrito no encontrado", { id });

      const newCart = {
        ...content[index],
        products,
      };
      content[index] = newCart;

      await this.persist(content);

      return getDTO(newCart);
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? `error al actualizar el carrito con id ${id}`,
        error.error ?? error
      );
    }
  }

  // eliminar carrito por id
  async deleteCartById(id) {
    try {
      await this.checkExistence();

      const content = await this.getCarts();
      const cart = content.find((cart) => cart.id === parseInt(id));

      if (!cart) throw new CustomError(404, "carrito no encontrado", { id });

      const filteredContent = content.map((cart) => {
        if (cart.id === parseInt(id)) {
          cart.products = [];
        }
        return cart;
      });
      await this.persist(filteredContent);

      return getDTO(cart);
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? `error al eliminar el carrito con id ${id}`,
        error.error ?? error
      );
    }
  }
}

export default CartsDAOFilesystem;
