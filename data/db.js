import mongoose from "mongoose";

export const connectdb = () =>{
    mongoose.connect(process.env.MONGO_DB,{
        dbName : "ToDo"
    }).then(()=>{
        console.log("DB connected");
    }).catch((err)=>{
        console.log(err);
    })
}