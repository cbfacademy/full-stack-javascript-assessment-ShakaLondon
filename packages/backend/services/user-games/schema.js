import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const UserGamesSchema = new Schema(
  {
    gameCode: {
      type: String,
      required: true,
    },
    description: {
      type: Array,
      required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    gameID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Games",
  },
  complete: {
    type: Boolean,
    required: true,
    default: false,
},
gameAssets: [{
    type: Object,
    required: true,
    ref: "GameAssets",
}],
  },
  {
    timestamps: true, // adding createdAt and modifiedAt automatically
  }
);

export default model("UserGames", UserGamesSchema);