import ProductModel from "../../../models/product.js";
import CustomError from "../../../utils/CustomError.js";
import getDTO from "../../DTOs/ProductDTO.js";

class ProductsDAOMongo {
  async getAll() {
    try {
      const products = await ProductModel.find().lean();
      return getDTO(
        products.map((product) => ({ ...product, id: product._id }))
      );
    } catch (error) {
      throw new CustomError(500, "error al obtener todos los productos", error);
    }
  }

  async getById(id) {
    try {
      const product = await ProductModel.findOne({ _id: id }).lean();

      if (!product)
        throw new CustomError(404, "producto no encontrado", { id });

      return getDTO({ ...product, id: product._id });
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
      const newProduct = await ProductModel.create(product);
      return getDTO({ ...newProduct.toObject(), id: newProduct._id });
    } catch (error) {
      throw new CustomError(500, "error al guardar producto", error);
    }
  }

  async updateById(id, product) {
    try {
      const result = await ProductModel.findByIdAndUpdate(id, product).lean();

      if (!result) throw new CustomError(404, "producto no encontrado", { id });

      return getDTO({ ...result, id: result._id });
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
      const result = await ProductModel.findByIdAndRemove(id).lean();

      if (!result) throw new CustomError(404, "producto no encontrado", { id });
      return getDTO({ ...result, id: result._id });
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? `error al eliminar el producto con id ${id}`,
        error.error ?? error
      );
    }
  }
}

export default ProductsDAOMongo;
