import CartModel from "../../../models/Cart.js";
import CustomError from "../../../utils/CustomError.js";
import getDTO from "../../DTOs/CartDTO.js";

class CartsDAOMongo {
  async getCarts() {
    try {
      const carts = await CartModel.find().lean();
      return getDTO(carts.map((cart) => ({ ...cart, id: cart._id })));
    } catch (error) {
      throw new CustomError(500, "error al obtener todos los carritos", error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await CartModel.findOne({ _id: id }).lean();

      if (!cart) throw new CustomError(404, "carrito no encontrado", { id });

      return getDTO({ ...cart, id: cart._id });
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
      const newCart = await CartModel.create(cart);
      return getDTO({ ...newCart.toObject(), id: newCart._id });
    } catch (error) {
      throw new CustomError(500, "error al crear carrito", error);
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
      const result = await CartModel.findByIdAndUpdate(
        id,
        { products },
        { new: true }
      ).lean();

      if (!result) throw new CustomError(404, "carrito no encontrado", { id });

      return getDTO({ ...result, id: result._id });
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
      const result = await CartModel.findByIdAndUpdate(
        id,
        { products: [] },
        { new: true }
      ).lean();

      if (!result) throw new CustomError(404, "carrito no encontrado", { id });

      return getDTO({ ...result, id: result._id });
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? `error al eliminar el carrito con id ${id}`,
        error.error ?? error
      );
    }
  }
}

export default CartsDAOMongo;
