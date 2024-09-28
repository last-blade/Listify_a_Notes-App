import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { apiResponse } from "../utils/apiResponse.js"
import { Task } from "../models/task.model.js";



const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return {accessToken, refreshToken}
    } 
    
    catch (error) {
        throw new apiError(500, "Something went wrong while generating refresh and access token.")    
    }
}

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

const loginUser = asyncHandler(async (request, response) => {
    /*
    user se data lenge form ke through
    all fields are required, check karenge
    fir user existence dekhenge
    if user exist-> password check
    if password correct->refreshtoken generate karenge and access token generate karenge and cokkie mein save kar denge
    if password correct-> show error
    if user not exist-> return error
    */
    console.log("body:- ",request.body);
    const {email, password} = request.body;

    if(!(email && password)){
        throw new apiError(404, "Email or password is required.")
    }

    const user = await User.findOne({
        $or: [{email}]
    })

    console.log("email:- ", email)

    if(!user){
        throw new apiError(404, "User not found.")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new apiError(404, "Email or password is incorrect.")
    }

    const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true, // by default jo hai server par cookies ko edit karne ke permission hoti hai, lekin httpOnly and secure ko true karne se ab cookies ko edit nahin kar sakta koi bhi, ab bas server hi modify kar sakta hai cookies ko
        secure: true
    }

    // console.log("AccessToke:- ", accessToken);
    // console.log("RefreshToken:- ", refreshToken);

    return response
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new apiResponse(200, {user: loggedInUser, accessToken, refreshToken}, "User Logged In successfully.")
    )
});

const logoutUser = asyncHandler(async (request, response) => {
    await User.findByIdAndUpdate(request.user._id, {$set: {refreshToken: undefined}, new: true});

    const options = {
        httpOnly: true, // by default jo hai server par cookies ko edit karne ke permission hoti hai, lekin httpOnly and secure ko true karne se ab cookies ko edit nahin kar sakta koi bhi, ab bas server hi modify kar sakta hai cookies ko
        secure: true
    }

    return response
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged out successfully."))

});

const createTask = asyncHandler(async (request, response) => {

    const {title, content} = request.body;
    // console.log('User in request:', request.user);

    const user = await User.findById(request.user);
    // console.log(user)
    const task = await Task.create({
        title,
        content,
        owner: user._id
    });

    request.user.allTasks.push(task._id);
    await request.user.save();

    const populatedTask = await Task.findById(task._id).populate('owner', '-password -refreshToken');

    return response.status(201).json(new apiResponse(201, populatedTask, "Task created."));

});

export {registerUser, loginUser, logoutUser, createTask};