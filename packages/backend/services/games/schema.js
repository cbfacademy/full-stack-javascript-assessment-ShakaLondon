import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const GamesSchema = new Schema(
  {
    gameCode: {
      type: String,
      required: true,
    },
    attempts: {
      type: Array,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    highestScore: {
        type: Object,
        required: true,
    },
  },
  {
    timestamps: true, // adding createdAt and modifiedAt automatically
  }
);

export default model("Games", GamesSchema);