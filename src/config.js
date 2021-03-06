import dotenv from "dotenv";
import yargs from "yargs";
import { join } from "path";

const args = yargs(process.argv.slice(2));

const argv = args
  .alias({
    m: "mode",
  })
  .default({
    mode: "prod",
  }).argv;

dotenv.config({
  path: join(process.cwd(), argv.mode === "prod" ? "prod.env" : "dev.env"),
});

export const PORT = process.env.PORT || 8080;
export const PERSISTENCE = process.env.PERSISTENCE || "mongodb";
export const MONGO_TIMEOUT = process.env.MONGO_TIMEOUT || 5000;
export const MONGO_ATLAS_DATABASE_URI = process.env.MONGO_ATLAS_DATABASE_URI;
export const FIRESTORE_DATABASE_URI = process.env.FIRESTORE_DATABASE_URI;
export const FIRESTORE_TYPE = process.env.FIRESTORE_TYPE;
export const FIRESTORE_PROJECT_ID = process.env.FIRESTORE_PROJECT_ID;
export const FIRESTORE_PRIVATE_KEY_ID = process.env.FIRESTORE_PRIVATE_KEY_ID;
export const FIRESTORE_PRIVATE_KEY = process.env.FIRESTORE_PRIVATE_KEY;
export const FIRESTORE_CLIENT_EMAIL = process.env.FIRESTORE_CLIENT_EMAIL;
export const FIRESTORE_CLIENT_ID = process.env.FIRESTORE_CLIENT_ID;
export const FIRESTORE_AUTH_URI = process.env.FIRESTORE_AUTH_URI;
export const FIRESTORE_TOKEN_URI = process.env.FIRESTORE_TOKEN_URI;
export const FIRESTORE_AUTH_PROVIDER_X509_CERT_URL =
  process.env.FIRESTORE_AUTH_PROVIDER_X509_CERT_URL;
export const FIRESTORE_CLIENT_X509_URL = process.env.FIRESTORE_CLIENT_X509_URL;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const NODEMAILER_HOST = process.env.NODEMAILER_HOST;
export const NODEMAILER_PORT = process.env.NODEMAILER_PORT;
export const NODEMAILER_AUTH_USER = process.env.NODEMAILER_AUTH_USER;
export const NODEMAILER_AUTH_PASS = process.env.NODEMAILER_AUTH_PASS;
export const PRODUCTS_COLLECTION =
  process.env.PRODUCTS_COLLECTION || "productos";
export const CARTS_COLLECTION = process.env.CARTS_COLLECTION || "carritos";
export const ORDERS_COLLECTION = process.env.ORDERS_COLLECTION || "ordenes";
export const USERS_COLLECTION = process.env.USERS_COLLECTION || "users";
export const MESSAGES_COLLECTION =
  process.env.MESSAGES_COLLECTION || "mensajes";
export const PRODUCTS_FILE = process.env.PRODUCTS_FILE || "productos.txt";
export const CARTS_FILE = process.env.CARTS_FILE || "carritos.txt";
export const ORDERS_FILE = process.env.ORDERS_FILE || "ordenes.txt";
export const USERS_FILE = process.env.USERS_FILE || "users.txt";
export const MESSAGES_FILE = process.env.MESSAGES_FILE || "mensajes.txt";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "60s";
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "supersecret";
