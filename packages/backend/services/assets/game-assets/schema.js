import mongoose from "mongoose";

const { Schema, model } = mongoose;

const GameAssetsSchema = new Schema(
  {
    imageName: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    imageID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assets",
    },
    imageTag: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adding createdAt and modifiedAt automatically
  }
);

export default model("GameAssets", GameAssetsSchema);