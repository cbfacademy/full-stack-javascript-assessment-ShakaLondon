import express from "express";
import helmet from "helmet";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import assetsRouter from "./services/assets/index.js";
// import gameAssetsRouter from "./services/assets/game-assets/index.js";
import { 
  catchAllErrorHandler, 
  entryForbiddenMiddleware, 
  notFoundMiddleware } from "./services/utils/errorhandler.js";
import userRouter from "./services/users/index.js";
import tokenRouter from "./services/token/index.js";
import gamesRouter from "./services/games/index.js";
import userGamesRouter from "./services/user-games/index.js";
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

// ROUTES
app.get('/', (req, res) => {
  res.status(200).send("Welcome to Dynamo Learning App!");
});

app.use("/assets", assetsRouter);
app.use("/users", userRouter);
app.use("/tokens", tokenRouter);
app.use("/games", gamesRouter);
app.use("/user-games", userGamesRouter);

// ERROR HANDLERS
app.use(notFoundMiddleware);
app.use(entryForbiddenMiddleware);
app.use(catchAllErrorHandler);

// CREATE APP TABLE
console.table(listEndpoints(app));

// LISTEN TO APP
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Server is running on ${PORT} and connected to MongoDB`);
  } catch (error) {
    console.log("Db connection is failed ", error);
  }
});

