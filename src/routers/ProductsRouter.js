import { Router } from "express";
// import AuthController from "../controller/authController.js";
import ProductController from "../controllers/ProductsController.js";

const routerProducts = Router();
// const authController = new AuthController();
const productController = new ProductController();

routerProducts.get("/", productController.getProduct);
routerProducts.get("/:id", productController.getProductById);
// routerProducts.post("/", authController.authenticate, productController.saveProduct);
// routerProducts.put("/:id", authController.authenticate, productController.updateProduct);
// routerProducts.delete("/:id", authController.authenticate, productController.deleteProduct);
routerProducts.post("/", productController.saveProduct);
routerProducts.put("/:id", productController.updateProduct);
routerProducts.delete("/:id", productController.deleteProduct);

export default routerProducts;
