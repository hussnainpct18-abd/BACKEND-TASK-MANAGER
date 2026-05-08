const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Name is required"]
    },
    color:{
        type:String,
        required:[true,"Color is required"]
    }
})


const categoryModel=mongoose.model("category",categorySchema);

module.exports=categoryModel;
