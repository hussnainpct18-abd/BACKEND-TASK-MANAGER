const categoryModel = require('../models/category.model');
const statusModel = require('../models/status.model');
const taskModel = require('../models/task.model');




async function createTask(req, res) {
    try {
        const { category, description, dueDate, dueTime, progress, status, title } =
            req.body;

        let color;
        let work = false, personal = false, learning = false;

        if (category === 'Work') {
            color = 'purple';
            work = true;
        } else if (category === 'Personal') {
            color = 'green';
            personal = true;
        } else {
            color = 'orange';
            learning = true;
        }

        const createCategory = await categoryModel.create({
            name:category,
            color
        })


        let icon;
        if (status === 'Done') {
            icon = "fa-solid fa-circle-check"
        } else if (status === 'Pending') {
            icon = "fa-solid fa-arrow-trend-up"
        } else {
            icon = "fa-solid fa-calendar"
        }

        const createStatus = await statusModel.create({
            name:status,
            icon
        })



        // Attach the authenticated user's id automatically
        const task = await taskModel.create({
            categoryId: createCategory._id,
            description,
            dueDate,
            dueTime,
            progress,
            statusId: createStatus._id,
            title,
            userId: req.user._id,
            work,
            personal,
            learning
        });

        // const savedTask = await task.save();

        return res.status(201).json({
            message: "Task created successfully.",
            task: task,
        });
    } catch (error) {
        
        return res.status(500).json({ message: error.message });
    }
}

async function getAllTasks(req, res) {
    try {
        const tasks = await taskModel
            .find({ userId: req.user._id })
            .populate("categoryId", "name color")
            .populate("statusId", "name icon")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            count: tasks.length,
            task: tasks,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getTaskById(req, res) {
    try {
        const task = await taskModel
            .findOne({ _id: req.params.id, userId: req.user._id })
            .populate("categoryId", "name color")
            .populate("statusId", "name icon");

        if (!task) {
            return res
                .status(404)
                .json({ message: "Task not found." });
        }

        return res.status(200).json({ task: task });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function updateTask(req, res) {
    try {
        const {
            category,
            description,
            dueDate,
            dueTime,
            progress,
            status,
            title,
        } = req.body

        let color;
        let work=false, personal=false, learning=false  ;

        if (category === 'Work') {
            color = 'purple';
            work = true;
        } else if (category === 'Personal') {
            color = 'green'
            personal = true
        } else if(category==='Learning'){
            color = 'orange'
            learning = true
        }


        let icon;
        if (status === 'Done') {
            icon = "fa-solid fa-circle-check"
        } else if (status === 'In Progress') {
            icon = "fa-solid fa-arrow-trend-up"
        } else {
            icon = "fa-solid fa-calendar"
        }


        const find = await taskModel.findOne({ _id: req.params.id, userId: req.user._id })

        if (!find) {
            return res.status(404).json({ message: "Task not found" });
        }

        const updatecategory = await categoryModel.findByIdAndUpdate({ _id: find.categoryId },
            { $set: { category, color } }, { returnDocument: 'after' }
        )


        const updatestatus = await statusModel.findByIdAndUpdate({ _id: find.statusId },
            { $set: { status, icon } }, { returnDocument: 'after' }
        )

        const task = await taskModel.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            {
                $set: {
                    categoryId: updatecategory._id,
                    description,
                    dueDate,
                    dueTime,
                    progress,
                    statusId: updatestatus._id,
                    title,
                    work,
                    personal,
                    learning
                }
            },
            { returnDocument: 'after', runValidators: true }
        );

        if (!task) {
            return res
                .status(404)
                .json({ message: "Task not found." });
        }

        return res.status(200).json({
            message: "Task updated successfully.",
            task: task,
        });
    } catch (error) {
        // if (error.name === "ValidationError") {
        //     const messages = Object.values(error.errors).map((e) => e.message);
        //     return res.status(400).json({ success: false, message: messages.join(", ") });
        // }
        return res.status(500).json({ success: false, message: error.message });
    }
}

async function deleteTask(req, res) {
    try {
       const task = await taskModel.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!task) {
            return res
                .status(404)
                .json({ message: "Task not found." });
        }

        return res.status(200).json({
            message: "Task deleted successfully.",
            task: task,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}
