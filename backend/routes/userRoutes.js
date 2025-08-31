import express from "express";

import { 
         registerUser,
         loginUser,
 } from "../controllers/userController.js"
 
import { example } from "../controllers/filmController.js";

import { checkLogin } from "../middlewares/userMiddleware.js";


const router = express.Router();

// under /users
router.route("/register").post( registerUser );
router.route("/login").post( loginUser );



export default router;