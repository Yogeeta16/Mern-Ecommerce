import express from "express";
import { registerController ,loginController,testController} from"../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router naam ka ek object create kiya 
const router =express.Router()

//routing kri
//Register kra jiske liye method use kiya post wala 
router.post('/register',registerController)

//login  post 
router.post('/login',loginController);

//test route 
router.get('/test', requireSignIn,isAdmin, testController);



export default router;