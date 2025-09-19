import express from "express";

import { getHomepageFilms,
    getFilmData
 } from "../controllers/filmController.js";

import { checkLogin } from "../middlewares/userMiddleware.js";


const router = express.Router();
router.route("/filmpage/:keyword/:page").get(checkLogin, getHomepageFilms)
router.route("/data/:imdbId").get(checkLogin, getFilmData)


//router.route("/homepage/:title").get( getHomepageFilms )

//example routing
//router.route("/example").get( example )

export default router;