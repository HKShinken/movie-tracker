import express from "express";

import { example } from "../controllers/filmController.js";

import { checkLogin } from "../middlewares/userMiddleware.js";


const router = express.Router();
router.route("/all").get(checkLogin, example)


router.route("/movielist").get( example )

export default router;