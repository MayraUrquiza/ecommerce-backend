import mongoose from "mongoose";
import configData from "../configDB.js";

export class Order {
  constructor({ id, timestamp, user, number, email, products = [] }) {
    this.id = id;
    this.user = user;
    this.email = email;
    this.number = number;
    this.products = products;
    this.timestamp = timestamp;
  }
}

const { ordersCollection, usersCollection } = configData.mongoDB;

const OrderSchema = new mongoose.Schema({
  products: [{ type: Object, required: true }],
  timestamp: { type: Number, required: true },
  email: { type: String, required: true },
  number: { type: Number, required: true },
  user: { type: mongoose.Types.ObjectId, ref: usersCollection, required: true },
});

const OrderModel = mongoose.model(ordersCollection, OrderSchema);

export default OrderModel;
