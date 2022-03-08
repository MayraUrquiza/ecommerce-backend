import FirestoreDBClient from "./clients/FirestoreDBClient.js";
import MongoDBClient from "./clients/MongoDBClient.js";
import configData from "../configDB.js";

class Persistence {
  client;

  static connect() {
    const { useDatabase } = configData;

    switch (useDatabase.toLowerCase()) {
      case "firestore":
        this.client = new FirestoreDBClient();
        this.client.connect();
        break;
      case "mongodb":
        this.client = new MongoDBClient();
        this.client.connect();
        break;
      case "filesystem":
      default:
        break;
    }
  }
}

export default Persistence;
