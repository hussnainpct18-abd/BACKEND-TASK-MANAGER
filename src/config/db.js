const mongoose=require('mongoose');
async function connectDB(){
    let conn= await mongoose.connect(process.env.MONGO_URI);
    if(conn){
        console.log("Connected to database successfully");
    }
}



module.exports=connectDB;