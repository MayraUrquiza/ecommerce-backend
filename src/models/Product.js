import mongoose from "mongoose";
import configData from "../configDB.js";

export class Product {
  constructor({ id, name, description, code, price, thumbnail, stock, timestamp }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.code = code;
    this.price = price;
    this.thumbnail = thumbnail;
    this.stock = stock;
    this.timestamp = timestamp;
  }
}

const { productsCollection } = configData.mongoDB;

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  stock: { type: Number, required: true },
  timestamp: { type: Number, required: true },
});

const ProductModel = mongoose.model(productsCollection, ProductSchema);

export default ProductModel;
