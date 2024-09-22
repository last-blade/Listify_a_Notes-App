import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { apiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler( async (request, response) => {
    const {email, fullname, password} = request.body;
    console.log("email:- ", email);
    // check kar rahe hain ki saare fields bhare huye ho user dwara like email, password, etc. yeh sab bahara hona chahiye
    /*if(fullname === ""){
        throw new apiError(400, "Fullname is required.");        // 'apiError' naam se file banayi hai utils ke folder mein 
                                                                or usmein jaake dekhoge toh humne constructor banaya hai 
                                                                or constructor mein statuscode and message naam kaa field 
                                                                hai, isliye maine status code(i.e. 400) and message(i.e. Fullname is required) 
                                                                paas kiya hai ismein.
                                                            
    lekin aise toh hum ko har filed ke liye if-condition lagani paegi i.e. password, fullname, 
    email, username, etc. toh ise code lamba ho jaayega, toh iski jagah par hum if condition mein 'some' naam kaa method use karenge
    see below:-                                                        
    }*/ 

    if([fullname, password, email].some((anyfield)=> anyfield?.trim() === "")){
        throw new apiError(400, "All fields are required.")
    };

    /*const existedUser = User.findOne({email});    database mein user ko find kar rahe hain uski email id ke through, lekin hum doosre
                                                    tareeke se karenge check*/
                                                    
    const existedUser = await User.findOne({
        $or: [{email}], // '$or'-> The $or operator is used to specify that either one of the conditions should match.
    });
    
    if(existedUser){
        throw new apiError(409, "User with email or username already exist.")
    }

    const user = await User.create({
        fullname,
        email,
        password,
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new apiError(500, "Server error while registering the user.");
    }

    return response.status(201).json(
        new apiResponse(201, createdUser, "User registered successfully.")
    )

});

export {registerUser};