import CustomError from "../../../utils/CustomError.js";
import DB from "../../clients/FirestoreDBClient.js";
import getDTO from "../../DTOs/ProductDTO.js";
import configData from "../../../configDB.js";

const { productsCollection } = configData.firestore;

class ProductsDAOFirestore {
  async getAll() {
    try {
      const snapshot = await DB.collection(productsCollection).get();
      const products = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return getDTO(products);
    } catch (error) {
      throw new CustomError(500, "error al obtener todos los productos", error);
    }
  }

  async getById(id) {
    try {
      const doc = DB.collection(productsCollection).doc(id);
      const product = await doc.get();

      if (!product)
        throw new CustomError(404, "producto no encontrado", { id });

      return getDTO({ ...product.data(), id });
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
      const doc = await DB.collection(productsCollection).add({ ...product });
      const newProduct = await doc.get();

      return getDTO({ ...newProduct.data(), id: newProduct.id });
    } catch (error) {
      throw new CustomError(500, "error al guardar producto", error);
    }
  }

  async updateById(id, product) {
    try {
      const doc = DB.collection(productsCollection).doc(id);
      const oldProduct = await doc.get();

      if (!oldProduct)
        throw new CustomError(404, "producto no encontrado", { id });

      await doc.update({ ...product });
      const newProduct = await doc.get();

      return getDTO({ ...newProduct.data(), id: newProduct.id });
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
      const doc = DB.collection(productsCollection).doc(id);
      const oldProduct = await doc.get();

      if (!oldProduct)
        throw new CustomError(404, "producto no encontrado", { id });

      await doc.delete();

      return getDTO({ ...oldProduct.data(), id });
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? `error al eliminar el producto con id ${id}`,
        error.error ?? error
      );
    }
  }
}

export default ProductsDAOFirestore;
