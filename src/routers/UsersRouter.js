import { Router } from "express";
import UserController from "../controllers/UsersController.js";
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

const routerUsers = Router();
const userController = new UserController();

routerUsers.get("/", authenticate, userController.getUsers);
routerUsers.post("/registro", upload.single("image"), userController.saveUser);
routerUsers.post("/login", userController.login);

export default routerUsers;
