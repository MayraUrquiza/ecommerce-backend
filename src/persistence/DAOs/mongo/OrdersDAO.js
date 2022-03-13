import OrderModel from "../../../models/Order.js";
import CustomError from "../../../utils/CustomError.js";
import getDTO from "../../DTOs/OrderDTO.js";

class OrdersDAOMongo {
  async getAll() {
    try {
      const orders = await OrderModel.find().lean();
      return getDTO(orders.map((order) => ({ ...order, id: order._id })));
    } catch (error) {
      throw new CustomError(500, "error al obtener todas las órdenes", error);
    }
  }

  async save(order) {
    try {
      const newOrder = await OrderModel.create(order);
      return getDTO({ ...newOrder.toObject(), id: newOrder._id });
    } catch (error) {
      throw new CustomError(500, "error al guardar orden", error);
    }
  }
}

export default OrdersDAOMongo;
