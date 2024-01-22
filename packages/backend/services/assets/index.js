import express from "express";
import multer from "multer";
import ObjectModel from "./schema.js";
import ShapeModel from "./shapes/shape-schema.js";
import UsersModel from "./user-image/users-schema.js";
import LettersModel from "./letters/letters-schema.js";
import { storage } from "../utils/cloudinary.js";

const objectRouter = express.Router();

// const storage = multer.memoryStorage();
const parseFile = multer({ storage });

// UPLOADIMAGE ✅
objectRouter.post(
  "/upload/image/:objectType",
//   JwtMiddleware,
  parseFile.single("image"),
  async (req, res, next) => {
    try {

      const objectType = req.params.objectType

      const createObjectItem = async ( model ) => { 
        const objectResult = await new model({
            imageName: req.body.imageName,
            imagePath: req.file.path,
            imageType: req.body.imageType,
            dragLocation: req.body.dragLocation,
            dragSourcePath: req.body.dragSourcePath,
            dropSourcePath: req.body.dropSourcePath

        }).save();
        return objectResult
    }

      const uploadedImageItem = async ( model, object ) => { 
        const imageResult = await new ObjectModel({
            imageName: req.body.imageName,
            imagePath: req.file.path,
            imageType: req.body.imageType,
            sourceID: object._id,
        }).save();

        const objectResult = await model.findByIdAndUpdate(object._id, { imageID: imageResult._id }, {
            new: true, 
            runValidators: true,
          }).populate(["imageID", "dragSourcePath", "dropSourcePath"])
        return objectResult
    }

        switch (objectType) {
            case "Shapes":
                const shapeObject = await createObjectItem( ShapeModel )
                const shapeImage = await uploadedImageItem( ShapeModel, shapeObject )
                res.status(200).send(shapeImage);
                break;
            case "Letters":
                const lettersObject = await createObjectItem( LettersModel )
                const lettersImage = await uploadedImageItem( LettersModel, lettersObject )
                res.status(200).send(lettersImage);
                break;
            case "Users":
                const usersObject = await createObjectItem( UsersModel )
                const usersImage = await uploadedImageItem( UsersModel, usersObject )
                res.status(200).send(usersImage);
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
objectRouter.post(
    "/update/image/:_id",
  //   JwtMiddleware,
    parseFile.single("image"),
    async (req, res, next) => {
      try {
        const _id = req.params._id
        const shapeObject = await ShapeModel.findByIdAndUpdate( _id, { imagePath: req.file.path }, {
            new: true,
            runValidators: true,
          })
          console.log(shapeObject)
                  await ObjectModel.findByIdAndUpdate( shapeObject.imageID, { imagePath: req.file.path }, {
                    new: true,
                    runValidators: true,
                  })
                  shapeObject.populate(["imageID", "dragSourcePath", "dropSourcePath"])
                  res.status(200).send(shapeObject);
      } catch (err) {
        next(err);
      }
    }
  );

export default objectRouter;