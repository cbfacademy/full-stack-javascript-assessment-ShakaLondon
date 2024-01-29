import express from "express";
import multer from "multer";
import AssetsModel from "./schema.js";
import GameAssetsModel from "./game-assets/schema.js";
import UserImageModel from "./user-image/schema.js";
import UserModel from "../users/schema.js";
import { storage } from "../utils/cloudinary.js";
import { JwtMiddleware } from "../utils/jwt.js";

const assetsRouter = express.Router();

// const storage = multer.memoryStorage();
const parseFile = multer({ storage });

// UPLOADIMAGE ✅
assetsRouter.post(
  "/upload/:objectType",
  JwtMiddleware,
  parseFile.single("image"),
  async (req, res, next) => {
    try {

      const objectType = req.params.objectType

      const createObjectItem = async ( model ) => { 
        const objectResult = await new model({
            imageName: req.body.imageName,
            imagePath: req.file.path,
            imageTag: req.body.imageTag,
            userID: req.user?._id,
        }).save();
        return objectResult
    }

      const uploadedImageItem = async ( model, object ) => { 
        const imageResult = await new AssetsModel({
            imageName: req.body.imageName,
            imagePath: req.file.path,
            imageTag: req.body.imageTag,
            imageType: objectType,
            sourceID: object._id,
            dragLocation: req.body?.dragLocation,
            dragSourcePath: req.body?.dragSourcePath,
            dropSourcePath: req.body?.dropSourcePath
        }).save();

        const objectResult = await model.findByIdAndUpdate(object._id, { imageID: imageResult._id }, {
            new: true, 
            runValidators: true,
          }).populate(["imageID", "dragSourcePath", "dropSourcePath"])
        return objectResult
    }

    const updatedUserImage = async ( object, user ) => { 
      const imageResult = await AssetsModel.findByIdAndUpdate( user.avatar._id, { imagePath: req.file.path, sourceID: object._id }, {
          new: true,
          runValidators: true,
          });

      console.log(imageResult, '3')

      return imageResult
  }

        switch (objectType) {
            case "GameAssets":
                const lettersObject = await createObjectItem( GameAssetsModel )
                const lettersImage = await uploadedImageItem( GameAssetsModel, lettersObject )
                res.status(200).send(lettersImage);
                break;
            case "UserImage":
                const usersObject = await createObjectItem( UserImageModel )
                const usersImage = await updatedUserImage( usersObject, req.user )
                const user = await UserModel.findById( req.user._id ).populate(["gameRecords", "avatar", "avatar.sourceID"]);
                res.status(200).send({ user: user });
                break;
        
            default:
                break;
        }
    } catch (err) {
      next(err);
    }
  }
);

// UPDATE OBJECT WITH NEW IMAGE ✅
assetsRouter.post(
    "/update/assets/:objectType/:_id",
    JwtMiddleware,
    parseFile.single("image"),
    async (req, res, next) => {
      try {
        const _id = req.params._id
        const objectType = req.params.objectType

        switch (objectType) {
          case "GameAssets":
            const gameAssetsObject = await GameAssetsModel.findByIdAndUpdate( _id, { imagePath: req.file.path }, {
              new: true,
              runValidators: true,
            })
                    await AssetsModel.findByIdAndUpdate( gameAssetsObject.imageID, { imagePath: req.file.path }, {
                      new: true,
                      runValidators: true,
                    })
                    gameAssetsObject.populate(["imageID", "dragSourcePath", "dropSourcePath"])
                    res.status(200).send(gameAssetsObject);
              break;
          case "UserImage":
            const userImageObject = await UserImageModel.findByIdAndUpdate( _id, { imagePath: req.file.path }, {
              new: true,
              runValidators: true,
            })
                    await AssetsModel.findByIdAndUpdate( userImageObject.imageID, { imagePath: req.file.path }, {
                      new: true,
                      runValidators: true,
                    })
                    userImageObject.populate(["imageID", "userID"])
                    res.status(200).send(userImageObject);
              break;
                    
            default:
              break;
      }

      } catch (err) {
        next(err);
      }
    }
  );

    // GET USER IMAGE ✅
assetsRouter.get(
  "/get/UserImage/:_id",
  JwtMiddleware,
  parseFile.single("image"),
  async (req, res, next) => {
    try {
      const _id = req.params._id
      const objectType = req.params.objectType

          const userImageObject = await UserImageModel.findById( _id )
                  await AssetsModel.findByIdAndUpdate( userImageObject.imageID, { imagePath: req.file.path }, {
                    new: true,
                    runValidators: true,
                  })
                  userImageObject.populate(["imageID", "userID"])
                  res.status(200).send(userImageObject);

    } catch (err) {
      next(err);
    }
  }
);

  // DELETE USER IMAGE ✅
assetsRouter.delete(
  "/delete/UserImage/:_id",
  JwtMiddleware,
  parseFile.single("image"),
  async (req, res, next) => {
    try {
      const _id = req.params._id
      const objectType = req.params.objectType

          const userImageObject = await UserImageModel.findById( _id )
                  await AssetsModel.findByIdAndUpdate( userImageObject.imageID, { imagePath: null }, {
                    new: true,
                    runValidators: true,
                  })
                  await UserImageModel.delete( userImageObject.imageID )
                  userImageObject.populate(["imageID", "userID"])
                  res.status(200).send(userImageObject);

    } catch (err) {
      next(err);
    }
  }
);

export default assetsRouter;