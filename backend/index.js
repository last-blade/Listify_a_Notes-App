import dotenv from "dotenv";
import connectDB from "./db/database.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running at http://localhost:${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("MongoDB coonection failed !!!:- ", error.message);
});