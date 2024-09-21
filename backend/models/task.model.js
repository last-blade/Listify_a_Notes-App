import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title of the task is required."],

    },

    content: {
        type: String,
        required: [true, "Description of the task is required."],
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

}, {timestamps: true});


export const Task = mongoose.model("Task", taskSchema);