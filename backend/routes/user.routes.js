import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import multer from "multer";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

const upload = multer();

router.route("/register").post(upload.none(), registerUser);

router.route("/login").post(upload.none(), loginUser);

// router.route("/createtask").post(verifyJWT, upload.none(), createTask);

export default router;
