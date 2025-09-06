import express from "express";

import { 
         registerUser,
         loginUser,
         addFilmToWatchlist,
         getUserWatchList
 } from "../controllers/userController.js"

import { checkLogin } from "../middlewares/userMiddleware.js";


const router = express.Router();

// under /users
router.route("/register").post( registerUser );
router.route("/login").post( loginUser );

//prtected routes
router.route("/wlist").post( checkLogin, addFilmToWatchlist )
                      .get( checkLogin, getUserWatchList );



export default router;