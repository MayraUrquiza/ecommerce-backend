import mongoose from "mongoose";
import configData from "../configDB.js";

export class Cart {
  constructor({ id, timestamp, user, products = [] }) {
    this.id = id;
    this.user = user;
    this.products = products;
    this.timestamp = timestamp;
  }
}

const { cartsCollection, usersCollection } = configData.mongoDB;

const CartSchema = new mongoose.Schema({
  products: [{ type: Object, required: true }],
  timestamp: { type: Number, required: true },
  user: { type: mongoose.Types.ObjectId, ref: usersCollection, required: true },
});

const CartModel = mongoose.model(cartsCollection, CartSchema);

export default CartModel;
