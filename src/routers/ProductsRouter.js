import { Router } from "express";
import ProductController from "../controllers/ProductsController.js";
import authenticate from "../middlewares/Authentication.js";
import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

const routerProducts = Router();
const productController = new ProductController();

routerProducts.get("/", productController.getProduct);
routerProducts.get("/:id", productController.getProductById);
routerProducts.post(
  "/",
  authenticate,
  upload.single("thumbnail"),
  productController.saveProduct
);
routerProducts.put("/:id", authenticate, productController.updateProduct);
routerProducts.delete("/:id", authenticate, productController.deleteProduct);

export default routerProducts;
