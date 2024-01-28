import express from "express";
import createError from "http-errors";
import { generateJwt, JwtMiddleware } from "../utils/jwt.js";
import UserModel from "./schema.js";
import TokenModel from "../token/schema.js";
import UsersImageModel from "../assets/user-image/schema.js";
import AssetsModel from "../assets/schema.js";

const userRouter = express.Router();

// LOGIN ✅
userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({ message: "please enter a valiid username and password" });
    }

    const user = await UserModel.findByCredentials(email, password);

    if (!user) {
      return res.status(401).send({
        status: 401,
        accessToken: null,
        message: "Invalid Credentials!",
      });
    }

    await user.populate(["gameRecords", "avatar"]);

    const userDocument = user;

    const token = await generateJwt({ id: user._id });

    const refreshToken = await TokenModel.createToken(userDocument);

    res.status(200).send({
      user,
      accessToken: token,
      refreshToken: refreshToken,
    });
    } catch (error) {
      next(createError(500, `An error occurred while logging in: ${ error.message }`));
    }
});

// REGISTER ✅
userRouter.post(
  "/register",
//   userValidationRules(),
//   validate,
  async (req, res, next) => {
    try {
      const userObj = req.body;

      const user = await new UserModel(req.body).save();

      const { imageName, imagePath, imageTag, _id: imageID } = await new UsersImageModel({
        imageName: `${user.name}-${user.surname}-${user._id}`,
        imagePath: `https://ui-avatars.com/api/?name=${user.name}+${user.surname}`,
        imageType: "UserImage",
      }).save();

      const { _id: objectID } = await new AssetsModel({
        imageName,
        imagePath,
        imageType: "UserImage",
        imageTag,
        sourceID: imageID,
      }).save();

      const updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        { avatar: objectID },
        {
          new: true, 
          runValidators: true,
        }
      );

      await updatedUser.populate(["gameRecords", "avatar", "avatar.sourceID"]);

      const token = await generateJwt({ id: user._id });

      const refreshToken = await TokenModel.createToken(user);

      res.status(200).send({
        user: updatedUser,
        accessToken: token,
        refreshToken: refreshToken,
      });
    } catch (error) {
        next(createError(500, `An error occurred while registering: ${ error.message }`));
    }
  }
);

// UPDATE USER ✅
userRouter.put(
  "/login/update",
  JwtMiddleware,
  // userOnly,
  async (req, res, next) => {
    try {
      const userId = req.user._id;

      const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
      });

      if (updatedUser) {
        res.status(200).send(updatedUser);
      } else {
        next(createError(404, `User with _id ${userId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;