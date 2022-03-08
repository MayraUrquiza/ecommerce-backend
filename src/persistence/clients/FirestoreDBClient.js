import admin from "firebase-admin";
import configData from "../../configDB.js";
import logger from "../../utils/Logger.js";
import DBClient from "./DBClient.js";

class FirestoreDBClient extends DBClient {
  async connect() {
    try {
      const { serviceAccount, connectionString } = configData.firestore;

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: connectionString,
      });
      logger.info("Base de datos firestore conectada");
    } catch (error) {
      logger.error("Error al conectar a base de datos firestore");
    }
  }

  static collection(name) {
    return admin.firestore().collection(name);
  }
}

export default FirestoreDBClient;
