import CustomError from "../../../utils/CustomError.js";
import DB from "../../clients/FirestoreDBClient.js";
import getDTO from "../../DTOs/CartDTO.js";
import configData from "../../../configDB.js";

const { cartsCollection } = configData.firestore;

class CartsDAOFirestore {
  async getCarts() {
    try {
      const snapshot = await DB.collection(cartsCollection).get();
      const carts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return getDTO(carts);
    } catch (error) {
      throw new CustomError(500, "error al obtener todos los carritos", error);
    }
  }

  async getCartById(id) {
    try {
      const doc = DB.collection(cartsCollection).doc(id);
      const cart = await doc.get();

      if (!cart) throw new CustomError(404, "carrito no encontrado", { id });

      return getDTO({ ...cart.data(), id });
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
      const doc = await DB.collection(cartsCollection).add({ ...cart });
      const newCart = await doc.get();

      return getDTO({ ...newCart.data(), id: newCart.id });
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
      const doc = DB.collection(cartsCollection).doc(id);
      const oldCart = await doc.get();

      if (!oldCart) throw new CustomError(404, "carrito no encontrado", { id });

      const data = {
        ...oldCart.data(),
        products: products.map((product) => ({ ...product })),
      };
      await doc.update(data);
      const newCart = await doc.get();

      return getDTO({ ...newCart.data(), id: newCart.id });
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
      const doc = DB.collection(cartsCollection).doc(id);
      const oldCart = await doc.get();

      if (!oldCart) throw new CustomError(404, "carrito no encontrado", { id });

      await doc.delete();

      return getDTO({ ...oldCart.data(), id });
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? `error al eliminar el carrito con id ${id}`,
        error.error ?? error
      );
    }
  }

  // eliminar carrito por usuario (puede que no haga falta)
  async deleteCartByUserId(userId) {
    try {
      // TODO revisar bien si funciona
      const docRef = DB.collection(cartsCollection);
      const doc = docRef.where("user", "==", userId);
      const oldCart = await doc.get();

      if (!oldCart || oldCart.empty)
        throw new CustomError(404, "carrito no encontrado", { id });

      await oldCart.docs.foreach((doc) => doc.delete());

      return getDTO({ ...oldCart.docs[0].data(), id });
    } catch (error) {
      c;
      throw new CustomError(
        error.status ?? 500,
        error.description ??
          `error al eliminar el carrito del usuario con id ${userId}`,
        error.error ?? error
      );
    }
  }
}

export default CartsDAOFirestore;
