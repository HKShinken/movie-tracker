import express from "express";

import { getUserList, modifyUser } from "../controllers/adminController.js";

import { checkLogin } from "../middlewares/userMiddleware.js";


///api/admin/userlist/
const router = express.Router();
router.route("/userlist/:page").get(checkLogin, getUserList)

router.route("/moduser").put(checkLogin, modifyUser)


//router.route("/homepage/:title").get( getHomepageFilms )

//example routing
//router.route("/example").get( example )

export default router;