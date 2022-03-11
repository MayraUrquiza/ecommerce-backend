import { Router } from "express";
// import AuthController from "../controller/authController.js";
import UserController from "../controllers/UsersController.js";

const routerUsers = Router();
// const authController = new AuthController();
const userController = new UserController();

routerUsers.get("/", userController.getUsers);
routerUsers.get("/:id", userController.getUserById);
routerUsers.post("/", userController.saveUser);

export default routerUsers;
