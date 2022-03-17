import mongoose from "mongoose";
import configData from "../configDB.js";

export class User {
  constructor({ id, name, email, age, address, phone, image}) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.address = address;
    this.phone = phone;
    this.image = image;
  }
}

const { usersCollection } = configData.mongoDB;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: false },
  address: { type: String, required: false },
  phone: { type: String, required: true },
  image: { type: String, required: false },
});

const UserModel = mongoose.model(usersCollection, UserSchema);

export default UserModel;
