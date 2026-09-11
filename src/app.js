const express=require('express');
const path = require('path');
const router = require('./routes/auth.routes');
const routertask = require('./routes/task.routes');
const routerWorker = require('./routes/category.routes');
const morgan = require("morgan")
const cors=require('cors');

const app=express();

app.use(express.json())

app.use(morgan("dev"))

app.use(cors({
    origin: ["http://localhost:5173","https://task-manager-frontend-nine-liart.vercel.app"],
    credentials:true
}))

app.use(express.urlencoded({extended:true}))

const uploadsDir = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsDir));

app.use("/api/auth",router)

app.use('/api/task',routertask)

app.use('/api/category',routerWorker)

app.use((req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.error(err.stack || err.message);
    const status = err.status || 500;
    const message = status === 500 ? 'Internal server error' : err.message;

    return res.status(status).json({
        success: false,
        message
    });
});

module.exports=app;
