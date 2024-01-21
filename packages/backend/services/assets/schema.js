import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ObjectsSchema = new Schema(
  {
    imageName: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    imageType: {
      type: String,
      required: true,
    },
    sourceID: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "objectType",
    },
    objectType: {
      type: String,
      enum: ["Shapes", "Letters", "Users"],
    },
  },
  {
    timestamps: true, // adding createdAt and modifiedAt automatically
  }
);

export default model("Objects", ObjectsSchema);