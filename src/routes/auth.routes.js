const upload=require('../utils/multer.utils');
const authController=require("../controllers/auth.controllers")
const express=require('express');
const verifyToken = require('../middlewares/auth.middleware');
const router=express.Router();



router.post('/register',upload.single("file"),authController.signUp);

router.post('/login',authController.logIn);

router.get('/logout',verifyToken,authController.logOut)


module.exports=router