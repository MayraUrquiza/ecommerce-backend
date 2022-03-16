import CartsRepository from "../repositories/CartsRepository.js";
import OrdersRepository from "../repositories/OrdersRepository.js";
import UsersRepository from "../repositories/UsersRepository.js";
import CustomError from "../utils/CustomError.js";
import logger from "../utils/Logger.js";
import MailService from "./Mails.js";

class OrdersService {
  constructor() {
    this.ordersRepository = new OrdersRepository();
    this.cartsRepository = new CartsRepository();
    this.usersRepository = new UsersRepository();
  }

  async getOrders() {
    logger.info("Consultando órdenes de compra");
    return await this.ordersRepository.getAll();
  }

  async saveOrder(data) {
    const { cartId, email } = data;

    const cart = await this.cartsRepository.getCartById(cartId);

    if (!cart.products.length)
      throw new CustomError(400, "El carrito está vacío");

    const order = {
      user: cart.user,
      products: cart.products,
      email,
    };

    logger.info("Creando orden de compra");
    const newOrder = await this.ordersRepository.save(order);

    logger.info("Eliminando contenido de carrito");
    await this.cartsRepository.deleteCartById(cartId);

    logger.info("Enviando mail");
    const user = await this.usersRepository.getById(cart.user);
    await MailService.sendPurchaseMail(user, email, cart.products);

    return newOrder;
  }
}

export default OrdersService;
