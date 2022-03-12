import configData from "../../../configDB.js";
import MessagesDAOMongo from "../mongo/MessagesDAO.js";
import MessagesDAOFirestore from "../firestore/MessagesDAO.js";
import MessagesDAOFilesystem from "../filesystem/MessagesDAO.js";

class MessagesDAOFactory {
  static getDAO() {
    const { useDatabase } = configData;

    switch (useDatabase.toLowerCase()) {
      case "firestore":
        return new MessagesDAOFirestore();
      case "mongodb":
        return new MessagesDAOMongo();
      case "filesystem":
      default:
        return new MessagesDAOFilesystem();
    }
  }
}

export default MessagesDAOFactory;
