import CustomError from "../../../utils/CustomError.js";
import DB from "../../clients/FirestoreDBClient.js";
import getDTO from "../../DTOs/OrderDTO.js";
import configData from "../../../configDB.js";

const { ordersCollection } = configData.firestore;
class OrdersDAOFirestore {
  async getAll() {
    try {
      const snapshot = await DB.collection(ordersCollection).get();
      const orders = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return getDTO(orders);
    } catch (error) {
      throw new CustomError(500, "error al obtener todas las órdenes", error);
    }
  }

  async save(order) {
    try {
      const doc = await DB.collection(ordersCollection).add({ ...order });
      const newOrder = await doc.get();

      return getDTO({ ...newOrder.data(), id: newOrder.id });
    } catch (error) {
      throw new CustomError(500, "error al guardar orden", error);
    }
  }
}

export default OrdersDAOFirestore;
