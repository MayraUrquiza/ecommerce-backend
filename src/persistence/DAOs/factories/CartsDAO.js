import configData from "../../../configDB.js";
import CartsDAOMongo from "../mongo/CartsDAO.js";
import CartsDAOFirestore from "../firestore/CartsDAO.js";
import CartsDAOFilesystem from "../filesystem/CartsDAO.js";

class CartsDAOFactory {
  static getDAO() {
    const { useDatabase } = configData;

    switch (useDatabase.toLowerCase()) {
      case "firestore":
        return new CartsDAOFirestore();
      case "mongodb":
        return new CartsDAOMongo();
      case "filesystem":
      default:
        return new CartsDAOFilesystem();
    }
  }
}

export default CartsDAOFactory;
