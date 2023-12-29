import jwt from "jsonwebtoken"
import {User} from "../models/user.js"

export const isAuth = async(req,res,next) =>{
    const {token} = req.cookies;
    if(!token){
        return res.status(404).json({
            success : false,
            message : "Login Avvu mundhu"
        })
    }

    const decd = jwt.verify(token,process.env.JWT_SECRT_CODE)

    req.user = await User.findById(decd);
    next();
}