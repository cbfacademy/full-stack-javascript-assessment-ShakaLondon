import express from "express";
import GamesModel from "./schema.js";
import AssetsModel from "../assets/game-assets/schema.js";
import { ObjectId } from "mongodb";
import { JwtMiddleware } from "../utils/jwt.js";

const gamesRouter = express.Router();

// GET GAMES ✅
gamesRouter.get(
  "/all",
//   JwtMiddleware,
  async (req, res, next) => {
    try {
      const games = await GamesModel.find().populate(["gameAssets"])
      res.status(200).send(games);
    } catch (err) {
      next(err);
    }
  }
);

gamesRouter.post(
  "/create",
//   JwtMiddleware,
  async (req, res, next) => {
    try {
      console.log(req.body)
      const games = await new GamesModel(req.body).save();
      console.log(games)
      games.gameAssets.forEach( async (asset) => {
        await AssetsModel.findByIdAndUpdate( asset, { gameCode: games._id }, { new: true, runValidators: true, });
      });
      res.status(200).send(games);
    } catch (err) {
      next(err);
    }
  }
);

gamesRouter.post(
  "/update/:id",
//   JwtMiddleware,
  async (req, res, next) => {
    try {
      const games = await GamesModel.findByIdAndUpdate({_id: req.body}, {
        new: true,
        runValidators: true,
      });
      res.status(200).send(games);
    } catch (err) {
      next(err);
    }
  }
);

gamesRouter.get(
  "/single/:gameCode/:index",
  JwtMiddleware,
  async (req, res, next) => {
    try {
      const gameCode = req.params.gameCode
      const index = req.params.index

      const games = await GamesModel.findOne({gameCode: `${gameCode}`})
      .populate(
        {
        path: "gameAssets",
        populate: [{
          path: "sourceID",
          model: "GameAssets",

        },
        {
          path: "dragSourcePath",
          model: "Assets",

        },
        {
          path: "gameCode",
          model: "Games",

        },
]
    
      }
      )
      console.log(games)

      // const shapes = await ShapeModel.find({imageTag: { $regex: `^${shapeType}` }}).populate(["imageID", "dragSourcePath"]).skip( pageNumber*4 ).limit(4)
      res.status(200).send(games);
    } catch (err) {
      next(err);
    }
  }
);

  export default gamesRouter;