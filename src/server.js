import express from "express";
import Persistence from "./persistence/Persistence.js";
import { PORT } from "./config.js";
import logger from "./utils/Logger.js";
import routerProducts from "./routers/ProductsRouter.js";
import routerCarts from "./routers/CartsRouter.js";
import routerUsers from "./routers/UsersRouter.js";
import { Server as HttpServer } from "http";
import { engine } from "express-handlebars";
import routerChat from "./routers/ChatRouter.js";
import routerOrders from "./routers/OrdersRouter.js";
import routerInfo from "./routers/InfoRouter.js";
import ChatController from "./controllers/ChatController.js";

const app = express();
const httpServer = new HttpServer(app);

// socket escuchando en /api/chat y /api/chat/:email
ChatController.connectChat(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

Persistence.connect();

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "index.hbs",
  })
);

app.set("view engine", "hbs");
app.set("http server", httpServer);

app.get("/", (req, res) => {
  res.redirect("/chat");
});

app.use("/api/productos", routerProducts);
app.use("/api/carrito", routerCarts);
app.use("/api/usuarios", routerUsers);
app.use("/api/ordenes", routerOrders);
app.use("/info", routerInfo);
/**
 * GET /chat devuelve una vista de hbs con todos los mensajes
 * GET /chat/:email devuelve una vista de hbs con los mensajes del email pasado como parámetro
 */
 app.use("/chat", routerChat);

const server = httpServer.listen(PORT, () =>
  logger.info(`Listen on ${server.address().port}`)
);
server.on("error", (error) => logger.error(`Error en el servidor ${error}`));
