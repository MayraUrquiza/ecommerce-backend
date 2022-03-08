import configData from "../../../configDB.js";
import ProductsDAOMongo from "../mongo/ProductsDAO.js";
import ProductsDAOFirestore from "../firestore/ProductsDAO.js";
import ProductsDAOFilesystem from "../filesystem/ProductsDAO.js";

class ProductsDAOFactory {
  static getDAO() {
    const { useDatabase } = configData;

    switch (useDatabase.toLowerCase()) {
      case "firestore":
        return new ProductsDAOFirestore();
      case "mongodb":
        return new ProductsDAOMongo();
      case "filesystem":
      default:
        return new ProductsDAOFilesystem();
    }
  }
}

export default ProductsDAOFactory;
