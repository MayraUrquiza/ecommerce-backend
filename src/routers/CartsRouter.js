import { Router } from "express";
import CartController from "../controllers/CartsController.js";

const routerCarts = Router();
const cartController = new CartController();

routerCarts.get("/", cartController.getCarts); 
routerCarts.get("/:id/productos", cartController.getProductsInCart); 
routerCarts.post("/", cartController.saveCart); // creo que no lo necesito desde afuera porque se va a crear con el usuario
// routerCarts.post("/purchase", cartController.purchase); // este necesita la implementación de las órdenes
routerCarts.post("/:id/productos", cartController.saveProductInCart); 
routerCarts.delete("/:id", cartController.deleteCartById); // creo que no lo necesito porque se hace cuando se crea la orden
routerCarts.delete("/:id/productos/:productId", cartController.deleteProductInCart); 

export default routerCarts;
