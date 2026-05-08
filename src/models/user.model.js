const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({

    username:{
        type:String,
        required:[true,"User is required"],
        unique:[true,"User must be unique"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email must be unique"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    contact:{
        type:String,
        required:[true,"Contact is required"]
    },
    file:{
        type:String,
        required:[true,"File is required"]
    }
})

const userModel=mongoose.model("user",userSchema);

module.exports=userModel;