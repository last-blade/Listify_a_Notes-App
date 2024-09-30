import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";


dotenv.config(); // Load environment variables

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions));

// Parse application/json
app.use(express.json({ limit: "16kb" }));

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

// Importing routes
import userRoute from "./routes/user.routes.js";
import taskRoute from "./routes/task.routes.js"


// Creating routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/user", taskRoute);


export { app };
