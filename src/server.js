import express from "express";
import Persistence from "./persistence/Persistence.js";
import { PORT } from "./config.js";
import logger from "./utils/Logger.js";
import routerProducts from "./routers/ProductsRouter.js";
import routerCarts from "./routers/CartsRouter.js";
import routerUsers from "./routers/UsersRouter.js";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import ChatController from "./controllers/ChatController.js";
import { engine } from "express-handlebars";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

Persistence.connect();

io.on("connection", async (socket) => {
  logger.info("Nuevo cliente conectado");

  const chatController = new ChatController();
  const messages = await chatController.getMessages();

  socket.emit("refreshMessages", messages);

  socket.on("addMessage", async (message) => {
    await chatController.saveMessage(message);
    const messages = await chatController.getMessages();

    socket.emit("refreshMessages", messages);
  });

  socket.on("getMessages", async (email) => {
    const messages = !email
      ? await chatController.getMessages()
      : await chatController.getMessagesByEmail(email);

    socket.emit("refreshMessages", messages);
  });
});

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "index.hbs",
  })
);

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("main", {});
});

app.use("/api/productos", routerProducts);
app.use("/api/carrito", routerCarts);
app.use("/api/usuarios", routerUsers);

const server = httpServer.listen(PORT, () =>
  logger.info(`Listen on ${server.address().port}`)
);
server.on("error", (error) => logger.error(`Error en el servidor ${error}`));
