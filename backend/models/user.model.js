import mongoose, { MongooseError } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Fullname is required!"],
    },

    email: {
        type: String,
        required: [true, "Email is required!"],
        index: true,
        trim: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: [true, "Password is required!"],
    },

    allTasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ],

}, {timestamps: true});


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    else{
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function(){
    const token = jwt.sign({_id: this._id, email: this.email, fullname: this.fullname}, process.env.ACCESS_TOKEN_SECRET,  {expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
    return token;
};

userSchema.methods.generateRefreshToken = async function () {
    const token = jwt.sign({ _id: this._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
    return token;
  };



export const User = mongoose.model("User", userSchema);