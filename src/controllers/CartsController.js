import CartsService from "../services/Carts.js";

class CartController {
  constructor() {
    this.service = new CartsService();
  }

  getCarts = async (req, res) => {
    try {
      const carts = await this.service.getCarts();
      res.status(200).json(carts);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };

  getCartById = async (req, res) => {
    try {
      const { id } = req.params;
      const cart = await this.service.getCartById(id);

      res.status(200).json(cart);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };

  deleteCartById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.service.deleteCartById(id);

      res.status(200).json({
        status: 200,
        description: "El carrito fue eliminado.",
        product: result,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };

  getProductsInCart = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.service.getProductsInCart(id);

      res.status(200).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };

  saveProductInCart = async (req, res) => {
    try {
      const { id } = req.params;
      const { productId } = req.body;
      const result = await this.service.saveProductInCart(id, productId);

      res.status(200).json({
        status: 200,
        description: "El carrito fue actualizado.",
        cart: result,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };

  deleteProductInCart = async (req, res) => {
    try {
      const { id, productId } = req.params;
      const result = await this.service.deleteProductInCart(id, productId);

      res.status(200).json({
        status: 200,
        description: "El carrito fue eliminado.",
        cart: result,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };
}

export default CartController;
