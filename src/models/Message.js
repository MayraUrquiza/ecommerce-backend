import mongoose from "mongoose";
import configData from "../configDB.js";

const { messagesCollection } = configData.mongoDB;

const MessageSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: String, required: true, default: new Date().toLocaleString() },
});

const MessageModel = mongoose.model(messagesCollection, MessageSchema);

export default MessageModel;
