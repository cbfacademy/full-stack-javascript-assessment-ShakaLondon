import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { Schema, model } = mongoose;

const TokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  expiryDate: {
    type: Date,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: {
      expireAfterSeconds: 86400,
    },
  },
});

TokenSchema.statics.createToken = async function (user) {
  let expiredAt = new Date();

  expiredAt.setSeconds(expiredAt.getSeconds() + process.env.JWT_REFRESH_EXPIRY);

  let _token = uuidv4();

  let _object = new this({
    token: _token,
    userID: user._id,
    expiryDate: expiredAt.getTime(),
  });

  let refreshToken = await _object.save();

  return refreshToken.token;
};

TokenSchema.statics.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

export default model("RefreshToken", TokenSchema); 