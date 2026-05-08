const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'category',
        required: [true, "Category is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    dueDate: {
        type: Date,
        required: [true, "Duedate is required"]
    },
    dueTime: {
        type: String,
        required: [true, "DueTime is required"]
    },
    progress: {
        type: String,
        required: [true, "Progress is required"]
    },
    statusId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'status',
        required: [true, "Status Id is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "User id is required"]
    },
    work:{
        type:mongoose.SchemaTypes.Boolean,
        default:true
    },
    personal:{
        type:mongoose.SchemaTypes.Boolean,
        default:false
    },
    learning:{
        type:mongoose.SchemaTypes.Boolean,
        default:false
    },
    favourite:{
        type:mongoose.SchemaTypes.Boolean,
        default:false
    }
})

const taskModel=mongoose.model("task",taskSchema);

module.exports=taskModel