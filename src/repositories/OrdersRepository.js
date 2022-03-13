import { Order } from "../models/Order.js";
import OrdersDAOFactory from "../persistence/DAOs/factories/OrdersDAO.js";
import getDTO from "../persistence/DTOs/OrderDTO.js";

class OrdersRepository {
  constructor() {
    this.dao = OrdersDAOFactory.getDAO();
  }

  async getAll() {
    const orders = await this.dao.getAll();
    return orders.map(order => new Order(order));
  }

  async save(data) {
    return await this.dao.save(getDTO(data));
  }
}

export default OrdersRepository;
