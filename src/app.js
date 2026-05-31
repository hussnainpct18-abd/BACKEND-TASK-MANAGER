const express = require('express');
const router = require('./routes/auth.routes');
const routertask = require('./routes/task.routes');
const routerWorker = require('./routes/category.routes');
const morgan = require("morgan")
const cors = require('cors');




const app = express();

app.use(cors({
    origin: "https://task-manager-frontend-nine-liart.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


app.use(cors(corsOptions));


app.options('*', cors(corsOptions));


app.use(express.json())

app.use(morgan("dev"))


app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static('uploads'));

app.use("/api/auth", router)

app.use('/api/task', routertask)

app.use('/api/category', routerWorker)



module.exports = app;
