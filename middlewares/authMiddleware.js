import Jwt  from "jsonwebtoken";
import userModel from "../models/userModel.js";


//protect route token base

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
    try {
      const decode = Jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
    }
  };

//admin access
//isme huum check krenge ki role -0 ==user
//role -1== admin
// check if admin or not 




//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role == 1) {
      next();
     
    } else {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
       
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
