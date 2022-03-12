import { Router } from "express";
import UserController from "../controllers/UsersController.js";
import authenticate from "../middlewares/Authentication.js";

const routerUsers = Router();
const userController = new UserController();

routerUsers.get("/", authenticate, userController.getUsers);
routerUsers.post("/", userController.saveUser);
routerUsers.post("/login", userController.login);

export default routerUsers;
