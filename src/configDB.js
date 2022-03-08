import {
  PERSISTENCE,
  MONGO_TIMEOUT,
  MONGO_ATLAS_DATABASE_URI,
  FIRESTORE_DATABASE_URI,
  FIRESTORE_TYPE,
  FIRESTORE_PROJECT_ID,
  FIRESTORE_PRIVATE_KEY_ID,
  FIRESTORE_PRIVATE_KEY,
  FIRESTORE_CLIENT_EMAIL,
  FIRESTORE_CLIENT_ID,
  FIRESTORE_AUTH_URI,
  FIRESTORE_TOKEN_URI,
  FIRESTORE_AUTH_PROVIDER_X509_CERT_URL,
  FIRESTORE_CLIENT_X509_URL,
  PRODUCTS_COLLECTION,
  CARTS_COLLECTION,
  ORDERS_COLLECTION,
  USERS_COLLECTION,
  PRODUCTS_FILE,
  CARTS_FILE,
  ORDERS_FILE,
  USERS_FILE,
} from "./config.js";

const collections = {
  productsCollection: PRODUCTS_COLLECTION,
  cartsCollection: CARTS_COLLECTION,
  ordersCollection: ORDERS_COLLECTION,
  usersCollection: USERS_COLLECTION,
};

export default {
  useDatabase: PERSISTENCE,
  mongoDB: {
    connectionString: MONGO_ATLAS_DATABASE_URI,
    options: {
      serverSelectionTimeoutMS: MONGO_TIMEOUT,
    },
    ...collections,
  },
  firestore: {
    connectionString: FIRESTORE_DATABASE_URI,
    serviceAccount: {
      type: FIRESTORE_TYPE,
      project_id: FIRESTORE_PROJECT_ID,
      private_key_id: FIRESTORE_PRIVATE_KEY_ID,
      private_key: FIRESTORE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: FIRESTORE_CLIENT_EMAIL,
      client_id: FIRESTORE_CLIENT_ID,
      auth_uri: FIRESTORE_AUTH_URI,
      token_uri: FIRESTORE_TOKEN_URI,
      auth_provider_x509_cert_url: FIRESTORE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: FIRESTORE_CLIENT_X509_URL,
    },
    ...collections,
  },
  fileSystem: {
    productsFile: PRODUCTS_FILE,
    cartsFile: CARTS_FILE,
    ordersFile: ORDERS_FILE,
    usersFile: USERS_FILE,
  },
};
