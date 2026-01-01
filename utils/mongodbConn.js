import { MongoClient } from "mongodb";

const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb://admin:password123@localhost:27018/ecommerce?authSource=admin";
const DB_NAME = "ecommerce";
const COLLECTION_NAME = "products";

let mongocClient = null;
let mongoConn = null;

export async function initMongoDb() {
  try {
    mongocClient = new MongoClient(MONGO_URL);
    await mongocClient.connect();
    mongoConn = mongocClient.db(DB_NAME);

    const productsCollection = mongoConn.collection(COLLECTION_NAME);

    // Create the unique index on title
    await productsCollection.createIndex({ name: 1 }, { unique: true });
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

export async function getMongoConn() {
  if (!mongoConn) {
    if (!mongocClient) {
      mongocClient = new MongoClient(MONGO_URL);
      await mongocClient.connect();
    }
    mongoConn = mongocClient.db(DB_NAME);
  }
  return mongoConn;
}

export async function closeConnection() {
  if (mongocClient) {
    await mongocClient.close();
    mongocClient = null;
    mongoConn = null;
  }
}
