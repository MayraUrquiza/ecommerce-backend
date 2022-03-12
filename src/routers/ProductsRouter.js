import { Router } from "express";
import ProductController from "../controllers/ProductsController.js";
import authenticate from "../middlewares/Authentication.js";

const routerProducts = Router();
const productController = new ProductController();

routerProducts.get("/", productController.getProduct);
routerProducts.get("/:id", productController.getProductById);
routerProducts.post("/", authenticate, productController.saveProduct);
routerProducts.put("/:id", authenticate, productController.updateProduct);
routerProducts.delete("/:id", authenticate, productController.deleteProduct);

export default routerProducts;
