import { Router } from "express";
import OrderController from "../controllers/OrdersController.js";
import authenticate from "../middlewares/Authentication.js";

const routerOrders = Router();
const orderController = new OrderController();

routerOrders.get("/", authenticate, orderController.getOrders);
routerOrders.post("/:cartId", authenticate, orderController.saveOrder);

export default routerOrders;
