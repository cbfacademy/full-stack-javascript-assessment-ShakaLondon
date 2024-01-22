import express from "express";
import createError from "http-errors";
import { generateJwt, JwtMiddleware } from "../utils/jwt.js";
import UserModel from "./schema.js";
import TokenModel from "../token/schema.js";
import UsersImageModel from "../assets/user-image/users-schema.js";
import ObjectsModel from "../assets/schema.js";
// import UploadModel from "../uploads/schema.js";

// import validations from "../../utils/validation/index.js";
// import { adminOnly, userOnly } from "../../utils/adminOnly.js";
// import { onlyOwner } from "../../utils/onlyOwner.js"

// const { userValidationRules, reviewValidationRules, validate } = validations;

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

      const { imageName, imagePath, imageType, _id: imageID } = await new UsersImageModel({
        imageName: `${user.name}-${user.surname}-${user._id}`,
        imagePath: `https://ui-avatars.com/api/?name=${user.name}+${user.surname}`,
        imageType: "Users",
      }).save();

      const { _id: objectID } = await new ObjectsModel({
        imageName,
        imagePath,
        imageType,
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

// // GET REVIEWS FOR USER
// userRouter.get("/me/reviews", JwtMiddleware, async (req, res, next) => {
//   try {
//     const reviews = await ReviewModel.find({ userID: req.user._id.toString() });

//     res.status(200).send(reviews);
//   } catch (error) {
//     next(error);
//   }
// });

// UPDATE USER ✅
userRouter.put(
  "/me/update",
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

// // EDIT ONE REVIEW FOR USER
// userRouter.put(
//   "/me/reviews/:reviewID",
//   JwtMiddleware,
//   async (req, res, next) => {
//     try {
//       const reviewID = req.params.reviewID;

//       const updatedReview = await ReviewModel.findByIdAndUpdate(
//         reviewID,
//         req.body,
//         {
//           new: true, // to use existing record n
//           runValidators: true,
//         }
//       );

//       if (updatedReview) {
//         res.send(updatedReview);
//       } else {
//         next(createError(404, `User with _id ${reviewID} not found!`));
//       }
//     } catch (error) {
//       next(
//         createError(
//           500,
//           `An error occurred while updating user ${req.params.reviewID}`
//         )
//       );
//     }
//   }
// );

// // DELETE ONE REVIEW FOR USER
// userRouter.delete(
//   "/me/reviews/:reviewID",
//   JwtMiddleware,
//   async (req, res, next) => {
//     try {
//       const reviewID = req.params.reviewID;

//       const deletedReview = await ReviewModel.findByIdAndDelete(reviewID);

//       if (deletedReview) {
//         res.status(204).send();
//       } else {
//         next(createError(404, `User with _id ${reviewID} not found!`));
//       }
//     } catch (error) {
//       next(
//         createError(
//           500,
//           `An error occurred while deleting user ${req.params.reviewID}`
//         )
//       );
//     }
//   }
// );

// // ADD ONE REVIEW FOR USER FOR BUSINESS
// userRouter.post(
//   "/me/reviews/business/:businessID",
//   JwtMiddleware,
//   reviewValidationRules(),
//   validate,
//   async (req, res, next) => {
//     try {
//       const businessID = req.params.businessID;

//       const newReview = new ReviewModel({ ...req.body, userID: req.user._id });
//       const { _id } = await newReview.save();

//       const updatedBusiness = await BusinessModel.findByIdAndUpdate(
//         businessID,
//         { $push: { reviewIDs: _id } },
//         {
//           new: true, // to use existing record n
//           runValidators: true,
//         }
//       );

//       const updatedUser = await UserModel.findByIdAndUpdate(
//         req.user._id,
//         { $push: { reviewIDs: _id } },
//         {
//           new: true, // to use existing record n
//           runValidators: true,
//         }
//       );

//       res.status(201).send({ _id });

//       const deletedReview = await ReviewModel.findByIdAndDelete(reviewID);

//       if (deletedReview) {
//         res.status(204).send();
//       } else {
//         next(createError(404, `User with _id ${reviewID} not found!`));
//       }
//     } catch (error) {
//       next(
//         createError(
//           500,
//           `An error occurred while deleting user ${req.params.reviewID}`
//         )
//       );
//     }
//   }
// );

// // GET SINGLE USER ✅
// userRouter.get(
//   "/profile/:userName",
//   // JwtMiddleware,
//   async (req, res, next) => {
//     try {
//       const userName = req.params.userName;

//       const userProf = await UserModel.findOne({ username: userName });

//       await userProf.populate(["reviews", "avatar"]);

//       res.send(userProf);
//     } catch (error) {
//       next(createError(500, "An error occurred while getting users' list "));
//     }
//   }
// );

// // CREATE USER ✅
// userRouter.post(
//   "/",
//   JwtMiddleware,
//   adminOnly,
//   userValidationRules(),
//   validate,
//   async (req, res, next) => {
//     try {
//       const newUser = new UserModel(req.body);
//       const { _id } = await newUser.save();

//       res.status(201).send({ _id });
//     } catch (error) {
//       if (error.name === "ValidationError") {
//         next(createError(400, error));
//       } else {
//         console.log(error);

//         next(createError(500, "An error occurred while creating new blog"));
//       }
//     }
//   }
// );

// // GET ALL USERS ✅
// userRouter.get("/", JwtMiddleware, adminOnly, async (req, res, next) => {
//   try {
//     const users = await UserModel.find();

//     res.send(users);
//   } catch (error) {
//     next(createError(500, "An error occurred while getting users' list "));
//   }
// });

// // GET USER BY ID ✅
// userRouter.get("/:userId", JwtMiddleware, adminOnly, async (req, res, next) => {
//   try {
//     const userId = req.params.userId;

//     const user = await UserModel.findById(userId);

//     if (user) {
//       res.send(user);
//     } else {
//       next(createError(404, `User with _id ${userId} not found!`));
//     }
//   } catch (error) {
//     next(createError(500, "An error occurred while getting user"));
//   }
// });

// // DELETE USER BY ID ✅
// userRouter.delete(
//   "/:userId",
//   JwtMiddleware,
//   adminOnly,
//   async (req, res, next) => {
//     try {
//       const userId = req.params.userId;

//       const deletedUser = await UserModel.findByIdAndDelete(userId);

//       if (deletedUser) {
//         res.status(204).send();
//       } else {
//         next(createError(404, `User with _id ${userId} not found!`));
//       }
//     } catch (error) {
//       next(
//         createError(
//           500,
//           `An error occurred while deleting user ${req.params.userId}`
//         )
//       );
//     }
//   }
// );

// // EDIT USER BY ID ✅
// userRouter.put("/:userId", JwtMiddleware, adminOnly, async (req, res, next) => {
//   try {
//     const userId = req.params.userId;

//     const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
//       new: true, // to use existing record n
//       runValidators: true,
//     });

//     if (updatedUser) {
//       res.send(updatedUser);
//     } else {
//       next(createError(404, `User with _id ${userId} not found!`));
//     }
//   } catch (error) {
//     next(
//       createError(
//         500,
//         `An error occurred while updating user ${req.params.userId}`
//       )
//     );
//   }
// });

// // GET ALL BLOGS BY USER ✅
// userRouter.get(
//   "/:userId/reviews/",
//   JwtMiddleware,
//   adminOnly,
//   async (req, res, next) => {
//     try {
//       const userId = req.params.userId;

//       console.log(userId);

//       const userSearch = String(userId);

//       console.log(userSearch);

//       const reviewsByUser = await ReviewModel.find(
//         { userID: { $in: userSearch } },
//         function (err, result) {
//           if (err) {
//             res.send(err);
//           }
//         }
//       );

//       if (reviewsByUser) {
//         console.log(reviewsByUser);
//         res.send(reviewsByUser);
//       } else {
//         next(createError(404, `User with _id ${userId} not found!`));
//       }
//     } catch (error) {
//       next(createError(500, "An error occurred while getting user"));
//     }
//   }
// );

export default userRouter;