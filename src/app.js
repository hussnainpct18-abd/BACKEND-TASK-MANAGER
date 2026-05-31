const express = require('express');
const router = require('./routes/auth.routes');
const routertask = require('./routes/task.routes');
const routerWorker = require('./routes/category.routes');
const morgan = require("morgan")
const cors = require('cors');




const app = express();

const corsOptions = {
    origin: "https://task-manager-frontend-bdr3cquiy-hussnainpct18-7686s-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));
app.options(/.*/, cors());
// app.use(cors({
//     origin: "https://task-manager-frontend-nine-liart.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }))


// app.use(cors(corsOptions));


// app.options('*', cors(corsOptions));


app.use(express.json())

app.use(morgan("dev"))

app.get('/',(req,res)=>{
    res.send("Welcome to Task Manager ")
})
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static('uploads'));

app.use("/api/auth", router)

app.use('/api/task', routertask)

app.use('/api/category', routerWorker)



module.exports = app;
