import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ShapesSchema = new Schema(
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
      ref: "Objects",
    },
    imageType: {
      type: String,
      required: true,
    },
    dragSourcePath: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shapes",
    },
    dropSourcePath: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shapes",
    },
    dragLocation: {
      type: String,
      // required: true,
    }

  },
  {
    timestamps: true, // adding createdAt and modifiedAt automatically
  }
);

export default model("Shapes", ShapesSchema);