import express from "express";
import UserGamesModel from "./schema.js"
import UserModel from "../users/schema.js"
import { JwtMiddleware } from "../utils/jwt.js";

const userGamesRouter = express.Router();

// UPDATE USER GAMES ✅
userGamesRouter.post(
    "/update/:id",
    JwtMiddleware,
    async (req, res, next) => {
      try {
        const games = await GamesModel.findByIdAndUpdate( record, {
          new: true,
          runValidators: true,
        });
        res.status(200).send(games);
      } catch (err) {
        next(err);
      }
    }
  );

// CREATE USER GAMES ✅
userGamesRouter.post(
  "/create",
  JwtMiddleware,
  async (req, res, next) => {
    try {
        const { user, game, complete } = req.body
        const record = {
            gameCode: game.gameCode,
            description: game.description,
            useriD: user._id,
            gameID: game.gameID,
            complete: complete,
            progress: ( game.progress.length > 0 ) ? game.progress : [],
        }
      const games = await new UserGamesModel( record );
      const updateUser = await UserModel.findByIdAndUpdate( user._id, { $push: { gameRecords: games._id } }, { new: true, runValidators: true, }).populate(["gameRecords"]);
      res.status(200).send(updateUser);
    } catch (err) {
      next(err);
    }
  }
);

  export default userGamesRouter;