import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { apiResponse } from "../utils/apiResponse.js"
import { Task } from "../models/task.model.js";
import { request, response } from "express";


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


const fetchAllTasks = asyncHandler(async (request, response) => {
    const userId = request.user._id;

    const tasks = await Task.find({owner: userId}).sort({createdAt: -1});

    return response.status(200).json(
        new apiResponse(200, tasks, "Fetched all task successfully")
    )
});


const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.body.id;
    const userId = req.user._id;

    // console.log("taskId:- ", taskId)

    // Find the task to ensure it belongs to the user
    const task = await Task.findOne({ _id: taskId, owner: userId });
    if (!task) {
        throw new apiError(404, "Task not found.");
    }

    await Task.deleteOne({ _id: taskId });


    await User.findByIdAndUpdate(
        userId,
        { $pull: { allTasks: taskId } },
        { new: true, runValidators: false }
    );

    return res.status(200).json(
        new apiResponse(200, {}, "Task deleted successfully.")
    );
});

export { createTask, fetchAllTasks, deleteTask };