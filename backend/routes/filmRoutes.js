import express from "express";

import { getHomepageFilms } from "../controllers/filmController.js";

import { checkLogin } from "../middlewares/userMiddleware.js";


const router = express.Router();
router.route("/homepage").get(checkLogin, getHomepageFilms)


//router.route("/homepage/:title").get( getHomepageFilms )

//example routing
//router.route("/example").get( example )

export default router;