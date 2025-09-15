import express from "express";

import { getUserList } from "../controllers/adminController.js";

import { checkLogin } from "../middlewares/userMiddleware.js";


///api/admin/userlist/
const router = express.Router();
router.route("/userlist").get(checkLogin, getUserList)


//router.route("/homepage/:title").get( getHomepageFilms )

//example routing
//router.route("/example").get( example )

export default router;