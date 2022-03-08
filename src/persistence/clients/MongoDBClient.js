import mongoose from "mongoose";
import configData from "../../configDB.js";
import logger from "../../utils/Logger.js";
import DBClient from "./DBClient.js";

class MongoDBClient extends DBClient {
  async connect() {
    try {
      const { connectionString, options } = configData.mongoDB;

      mongoose.connect(connectionString, options);
      logger.info("Base de datos mongoDB conectada");
    } catch (error) {
      logger.error("Error al conectar a base de datos mongoDB");
    }
  }
}

export default MongoDBClient;
