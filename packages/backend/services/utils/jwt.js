import jwt from "jsonwebtoken";
import UserModel from "../../services/users/schema.js";
// import BusinessUserModel from "../../services/business-users/schema.js";
// import createError from "http-errors";

// Generate JWT tokens when we are authenticating one of our users

// function generateJwt

export function generateJwt(payload) {
  return new Promise(function (resolve, reject) {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
}

const { TokenExpiredError } = jwt;



export async function JwtMiddleware(req, res, next) {
  try {
    if (!req.headers.authorization) {
      const error = new Error("Unauthorised Access");
      error.status = 401;
      next(error);
    } else {
      const token = req.headers.authorization.replace("Bearer ", "");


      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded) {

            const user = await UserModel.findById(decoded.id);

            req.user = user;

            next();

        }
      } catch (e) {
        if (e instanceof TokenExpiredError) {
          // if the error thrown is because the JWT is unauthorized, return a 401 error
          return res
            .status(401)
            .send({ message: "Unauthorized! Access Token was expired!" });
        }
        return res.status(400);
      }
    }
  } catch (error) {
    next(error);
  }
}