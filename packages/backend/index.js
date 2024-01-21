import express from "express";
import helmet from "helmet";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

import dotenv from 'dotenv'
import { catchAllErrorHandler, entryForbiddenMiddleware, notFoundMiddleware } from "./services/utils/errorhandler.js";
dotenv.config()


// SETUP APP
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// CONNECT TO MONGO
const uri = process.env.MONGO_URI; // Add your connection string from Atlas to your .env file. See https://docs.atlas.mongodb.com/getting-started/
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect((err) => {
  if (err) {
    console.error("Error connecting to MongoDB", err);
    return;
  }
  console.log("Connected to MongoDB");
  client.close();
});


// ERROR HANDLERS
app.use(notFoundMiddleware);
app.use(entryForbiddenMiddleware);
app.use(catchAllErrorHandler);

// CREATE APP TABLE
console.table(listEndpoints(app));

// LISTEN TO APP
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Server is running on ${PORT} and connected to MongoDB`);
  } catch (error) {
    console.log("Db connection is failed ", error);
  }
});
