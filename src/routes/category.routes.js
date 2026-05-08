const express=require('express');
const verifyToken = require('../middlewares/auth.middleware');
const { getWorkTasks, getPersonalTasks, getLearningTasks, addFavourite, getFavourite } = require('../controllers/category.controllers');
const routerWorker=express.Router();

routerWorker.get('/getWork',verifyToken,getWorkTasks);

routerWorker.get('/getPersonal',verifyToken,getPersonalTasks);

routerWorker.get('/getLearning',verifyToken,getLearningTasks);

routerWorker.put('/addFav/:id',verifyToken,addFavourite);

routerWorker.get('/getFavourite',verifyToken,getFavourite);





module.exports=routerWorker;