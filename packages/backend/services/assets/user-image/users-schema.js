import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UsersImageSchema = new Schema(
  {
    imageName: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    sourceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Objects",
      // required: true,
    },
    imageType: {
      type: String,
      required: true,
      enum: ["Shapes", "Letters", "Users"],
    },
  },
  {
    timestamps: true, // adding createdAt and modifiedAt automatically
  }
);

export default model("UserImage", UsersImageSchema);