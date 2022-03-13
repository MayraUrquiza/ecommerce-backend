import { Router } from "express";
import InfoController from "../controllers/InfoController.js";

const routerInfo = Router();
const infoController = new InfoController();

routerInfo.get("/", infoController.getInfo);

export default routerInfo;
