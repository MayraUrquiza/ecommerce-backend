import configData from "../../../configDB.js";
import OrdersDAOMongo from "../mongo/OrdersDAO.js";
import OrdersDAOFirestore from "../firestore/OrdersDAO.js";
import OrdersDAOFilesystem from "../filesystem/OrdersDAO.js";

class OrdersDAOFactory {
  static getDAO() {
    const { useDatabase } = configData;

    switch (useDatabase.toLowerCase()) {
      case "firestore":
        return new OrdersDAOFirestore();
      case "mongodb":
        return new OrdersDAOMongo();
      case "filesystem":
      default:
        return new OrdersDAOFilesystem();
    }
  }
}

export default OrdersDAOFactory;
