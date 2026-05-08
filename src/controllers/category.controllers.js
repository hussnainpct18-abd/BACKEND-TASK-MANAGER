const taskModel = require('../models/task.model');




async function getWorkTasks(req, res) {

    try {
        const workTasks = await taskModel.find({ userId: req.user._id, work: true }).populate("categoryId", "name color")
            .populate("statusId", "name icon")

        if (workTasks.length === 0) {
            return res.status(404).json({
                message: "Tasks not found"
            })
        }

        return res.status(200).json({
            message: "tasks fetched successfully",
            task:workTasks
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }





}

async function getPersonalTasks(req, res) {

    try {
        const personalTasks = await taskModel.find({ userId: req.user._id, personal: true }).populate("categoryId", "name color")
            .populate("statusId", "name icon")

        if (personalTasks.length === 0) {
            return res.status(404).json({
                message: "tasks not found"
            })
        }

        return res.status(200).json({
            message: "Tasks fetched successfully",
            task:personalTasks
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function getLearningTasks(req, res) {

    try {

        const learningTasks = await taskModel.find({ userId: req.user._id, learning: true }).populate("categoryId", "name color")
            .populate("statusId", "name icon")

        if (learningTasks.length === 0) {
            return res.status(404).json({
                message: "tasks not found"
            })
        }
        return res.status(200).json({
            message: "Learning fetched successfully",
            task:learningTasks
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

async function addFavourite(req, res) {

    try {
        const { id } =
            req.params;

        const favTask = await taskModel.findOne({ _id: id, userId: req.user._id },)

        if (!favTask) {
            return res.status(404).json({
                message: "Task not found"
            })
        }
        favTask.favourite = !favTask.favourite;

        await favTask.save();

        return res.status(200).json({
            message: "Task added favourite successfully",
            task:favTask
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

}

async function getFavourite(req, res) {
    try {
        const favouriteTasks = await taskModel.find({ userId: req.user._id, favourite: true }).populate("categoryId", "name color")
            .populate("statusId", "name icon")

        if (favouriteTasks.length === 0) {
            return res.status(404).json({
                message: "Tasks not found"
            })
        }

        return res.status(200).json({
            message: "tasks fetched successfully",
            task:favouriteTasks
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}


module.exports = {
    getWorkTasks,
    getPersonalTasks,
    getLearningTasks,
    addFavourite,
    getFavourite
}