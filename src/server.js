import express from "express";
import Persistence from "./persistence/Persistence.js";
import { PORT } from "./config.js";
import logger from "./utils/Logger.js";
import routerProducts from "./routers/ProductsRouter.js";
import routerCarts from "./routers/CartsRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

Persistence.connect();

app.use("/api/productos", routerProducts);
app.use("/api/carrito", routerCarts);

const server = app.listen(PORT, () =>
  logger.info(`Listen on ${server.address().port}`)
);
server.on("error", (error) => logger.error(`Error en el servidor ${error}`));
