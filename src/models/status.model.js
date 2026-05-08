const mongoose=require('mongoose');

const statusSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"name is required"]
    },
    icon:{
        type:String,
        required:[true,"Icon is required"]
    }
});


const statusModel=mongoose.model("status",statusSchema);

module.exports=statusModel;