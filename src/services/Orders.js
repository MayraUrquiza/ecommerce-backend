import CartsRepository from "../repositories/CartsRepository.js";
import OrdersRepository from "../repositories/OrdersRepository.js";
import UsersRepository from "../repositories/UsersRepository.js";
import logger from "../utils/Logger.js";

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

    const order = {
      user: cart.user,
      products: cart.products,
      email,
    };

    logger.info("Creando orden de compra");
    const newOrder = await this.ordersRepository.save(order);

    logger.info("Eliminando contenido de carrito");
    await this.cartsRepository.deleteCartById(cartId);

    return newOrder;
  }
}

export default OrdersService;
