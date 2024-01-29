import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AssetsSchema = new Schema(
  {
    imageName: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    imageTag: {
      type: String,
      // required: true,
    },
    imageType: {
      type: String,
      required: true,
      enum: ["GameAssets", "UserImage"],
    },
    sourceID: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "objectType",
    },
    objectType: {
      type: String,
      enum: ["GameAssets", "UserImage"],
    },
    gameCode: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Games",
    },
    dragSourcePath: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameAssets",
    },
    dropSourcePath: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GameAssets",
    },
    dragLocation: {
      type: Object,
      // required: true,
    }
  },
  {
    timestamps: true, // adding createdAt and modifiedAt automatically
  }
);

export default model("Assets", AssetsSchema);