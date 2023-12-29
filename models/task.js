import mongoose from "mongoose"

const sch = new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    desc :{
        type : String,
        required : true
    },
    isComp : {
        type : Boolean,
        default : false,
    },
    user : {
        type  : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now,
    }
})

export const Task = mongoose.model("Task",sch)