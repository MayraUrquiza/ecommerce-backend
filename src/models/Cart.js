import mongoose from "mongoose";
import configData from "../configDB.js";

const { cartsCollection, usersCollection } = configData.mongoDB;

const CartSchema = new mongoose.Schema({
  products: [{ type: Object, required: true }],
  timestamp: { type: Number, required: true },
  user: { type: mongoose.Types.ObjectId, ref: usersCollection, required: true },
});

const CartModel = mongoose.model(cartsCollection, CartSchema);

export default CartModel;
