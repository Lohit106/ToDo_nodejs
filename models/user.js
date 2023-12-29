import mongoose from "mongoose"

const sch = new mongoose.Schema({
    name :String,
    email : {
        type : String,
        unique : true,
    },
    password : {
        type : String,
        select : false,
    },
    createdAt : {
        type : Date,
        default : Date.now,
    }
})

export const User = mongoose.model("user",sch)