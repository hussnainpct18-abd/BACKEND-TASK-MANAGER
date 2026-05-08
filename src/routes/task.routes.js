const express=require("express");
const verifyToken = require("../middlewares/auth.middleware");
const taskController = require("../controllers/task.controller");
const routertask=express.Router();

routertask.post("/createTask",verifyToken,taskController.createTask);

routertask.get("/getAllTasks",verifyToken,taskController.getAllTasks);

routertask.get("/getTaskById/:id",verifyToken,taskController.getTaskById);

routertask.put("/updateTask/:id",verifyToken,taskController.updateTask);

routertask.delete("/deleteTask/:id",verifyToken,taskController.deleteTask);






module.exports=routertask;