import { Router } from "express";
import CartController from "../controllers/CartsController.js";
import authenticate from "../middlewares/Authentication.js";

const routerCarts = Router();
const cartController = new CartController();

routerCarts.get("/", authenticate, cartController.getCarts);
routerCarts.get(
  "/:id/productos",
  authenticate,
  cartController.getProductsInCart
);
// routerCarts.post("/purchase", cartController.purchase); // este necesita la implementación de las órdenes
routerCarts.post(
  "/:id/productos",
  authenticate,
  cartController.saveProductInCart
);
routerCarts.delete("/:id", cartController.deleteCartById); // creo que no lo necesito porque se hace cuando se crea la orden
routerCarts.delete(
  "/:id/productos/:productId",
  authenticate,
  cartController.deleteProductInCart
);

export default routerCarts;
