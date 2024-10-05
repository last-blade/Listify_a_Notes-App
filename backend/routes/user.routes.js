import { Router } from "express";
import { fetchUser, forgotUserPassword, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import multer from "multer";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

const upload = multer();

router.route("/register").post(upload.none(), registerUser);

router.route("/login").post(upload.none(), loginUser);

router.route("/logout").get(verifyJWT, logoutUser);

router.route("/getuser").get(verifyJWT, fetchUser);

router.route("/forgotpassword").post(upload.none(), forgotUserPassword)

export default router;
