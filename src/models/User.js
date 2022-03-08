import mongoose from "mongoose";
import configData from "../configDB.js";

const { usersCollection } = configData.mongoDB;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, required: true },
});

const UserModel = mongoose.model(usersCollection, UserSchema);

export default UserModel;
