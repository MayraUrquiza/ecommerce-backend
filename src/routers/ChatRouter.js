import { Router } from "express";
import ChatController from "../controllers/ChatController.js";

const routerChat = Router();
const chatController = new ChatController();

routerChat.get("/", chatController.getMessages);
routerChat.get("/:email", chatController.getMessagesByEmail);

export default routerChat;
