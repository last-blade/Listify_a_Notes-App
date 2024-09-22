import { apiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import User from "../models/user.model.js"
import {apiResponse} from "../utils/apiResponse.js"

const registerUser = asyncHandler(async (request, response)=>{
    const {fullname, email, password} = request.body;

    console.log("Fullname:- ", fullname);

    if([fullname, email, password].some((anyField)=>anyField?.trim() === "")){
        throw new apiError(400, "All fields are required.")
    }

    const existedUser = User.findOne({
        $or: [{email}]
    })

    if(existedUser){
        throw new apiError(409, `User with this email ${email} already exist.`)
    }

    const user = await User.create({
        fullname,
        email,
        password
    });

    const createdUser = await User.findOne(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new apiError(500, "Server error whle registering the user.")
    }

    return response.status(201).json(
        new apiResponse(201, createdUser, "User registered successfully.")
    )

})

export default registerUser;