import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/feature.js";
import ErrorNew from "../middlewares/error.js";

export const getAllUsers = async(req,res)=>{};

export const register = async(req,res,next)=>{
    const {name, email, password} = req.body;

    let usr = await User.findOne({email});
    if(usr){
        return next(new ErrorNew("User already exists","404"));
    }

    const hashp = await bcrypt.hash(password,10)

    usr = await User.create({
        name, email, password : hashp,
    })

    setCookie(usr,res,201,"Registered Successfully..");
};

export const getLoggedIn = async(req,res,next) =>{
    const {email,password} = req.body;

    const usr = await User.findOne({email}).select("+password");
    if(!usr){
        return next(new ErrorNew("InValid ID","400"));
    }

    const check = await bcrypt.compare(password,usr.password)

    if(!check){
        return next(new ErrorNew("InValid email or Password","400"));
    }

    setCookie(usr,res,200,`Welcome back! ${usr.name}`);
}

export const getMe = (req,res) =>{
    res.status(200).json({
        success : true,
        user : req.user,
    })
}

export const logout = (req,res) =>{
    res.cookie("token","",{
        expires : new Date(Date.now()),
        sameSite : process.env.NODE_ENV === "dev" ? "lax" : "none",
        secure : process.env.NODE_ENV === "dev" ? false : true
    }).json({
        success : true
    })
}