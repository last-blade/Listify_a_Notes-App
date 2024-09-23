import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (request, response, next) => {
    try {
        const token = request.cookie.accessToken;
        
        if(!token){
            throw new apiError(401, "Unauthorized access.")
        }
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            
        const user = await User.findById(decodedToken?._id).select("-password refreshToken");
            
        if(!user){
            throw new apiError(404, "Invalid access token.")
        }
        
        request.user = user;
        next();
    } 

    catch (error) {
        throw new apiError(401, error?.message || "Invalid access token.")
    }

});