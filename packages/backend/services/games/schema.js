import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const GamesSchema = new Schema(
  {
    gameCode: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    gameAssets: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Assets",
  }],
  },
  {
    timestamps: true, // adding createdAt and modifiedAt automatically
  }
);

export default model("Games", GamesSchema);