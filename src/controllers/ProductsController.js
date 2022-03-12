import ProductsService from "../services/Products.js";

class ProductController {
  constructor() {
    this.service = new ProductsService();
  }

  getProduct = async (req, res) => {
    try {
      const products = await this.service.getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await this.service.getProductById(id);

      res.status(200).json(product);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };

  saveProduct = async (req, res) => {
    try {
      const result = await this.service.saveProduct(req.body);
      res.status(201).json({
        status: 201,
        description: "El producto fue creado.",
        product: result,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.service.updateProduct(id, req.body);

      res.status(200).json({
        status: 200,
        description: "El producto fue actualizado.",
        product: result,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.service.deleteProduct(id);

      res.status(200).json({
        status: 200,
        description: "El producto fue eliminado.",
        product: result,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };
}

export default ProductController;
