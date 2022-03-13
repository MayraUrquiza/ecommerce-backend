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
import routerInfo from "./routers/infoRouter.js";

const app = express();
const httpServer = new HttpServer(app);

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
  res.redirect("/api/chat");
});

app.use("/api/productos", routerProducts);
app.use("/api/carrito", routerCarts);
app.use("/api/usuarios", routerUsers);
app.use("/api/chat", routerChat);
app.use("/api/ordenes", routerOrders);
app.use("/info", routerInfo);

const server = httpServer.listen(PORT, () =>
  logger.info(`Listen on ${server.address().port}`)
);
server.on("error", (error) => logger.error(`Error en el servidor ${error}`));
