import express from "express";
import ShapeModel from "./shape-schema.js"

const shapeRouter = express.Router();

// GET SHAPES ✅
shapeRouter.get(
  "/all/:type",
//   JwtMiddleware,
  async (req, res, next) => {
    try {
      const shapeType = req.params.type
      const shapes = await ShapeModel.find({imageType: { $regex: `^${shapeType}` }}).populate(["imageID", "dragSourcePath"])
      res.status(200).send(shapes);
    } catch (err) {
      next(err);
    }
  }
);

shapeRouter.get(
  "/all/:type/:page",
//   JwtMiddleware,
  async (req, res, next) => {
    try {
      const shapeType = req.params.type
      const pageNumber = req.params.page
      const getSkipLimit = ( pageNumber ) => {
        return {
          skip: ( pageNumber*4 ), limit: 2
        }
      }
      const shapes = await ShapeModel.find({imageType: { $regex: `^${shapeType}` }}).populate(["imageID", "dragSourcePath"]).skip( pageNumber*4 ).limit(4)
      res.status(200).send(shapes);
    } catch (err) {
      next(err);
    }
  }
);

shapeRouter.get(
    "/all",
  //   JwtMiddleware,
    async (req, res, next) => {
      try {
        const shapes = await ShapeModel.find().populate(["imageID", "dragSourcePath"])
        res.status(200).send(shapes);
      } catch (err) {
        next(err);
      }
    }
  );

  export default shapeRouter;