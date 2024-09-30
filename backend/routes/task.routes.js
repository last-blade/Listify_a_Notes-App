import { Router } from "express";
import multer from "multer";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTask, deleteTask, fetchAllTasks } from "../controllers/tasks.controller.js";

const router = Router();

const upload = multer();

router.route("/createtask").post(verifyJWT, upload.none(), createTask);

router.route("/fetchtasks").get(verifyJWT, upload.none(), fetchAllTasks);

router.route("/deletetask").post(verifyJWT, deleteTask);

export default router;