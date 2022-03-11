import configData from "../../../configDB.js";
import UsersDAOMongo from "../mongo/UsersDAO.js";
import UsersDAOFirestore from "../firestore/UsersDAO.js";
import UsersDAOFilesystem from "../filesystem/UsersDAO.js";

class UsersDAOFactory {
  static getDAO() {
    const { useDatabase } = configData;

    switch (useDatabase.toLowerCase()) {
      case "firestore":
        return new UsersDAOFirestore();
      case "mongodb":
        return new UsersDAOMongo();
      case "filesystem":
      default:
        return new UsersDAOFilesystem();
    }
  }
}

export default UsersDAOFactory;
