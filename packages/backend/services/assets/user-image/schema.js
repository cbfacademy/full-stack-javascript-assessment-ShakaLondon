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
    imageID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assets",
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  {
    timestamps: true, // adding createdAt and modifiedAt automatically
  }
);

export default model("UserImage", UsersImageSchema);