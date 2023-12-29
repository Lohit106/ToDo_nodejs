import jwt from "jsonwebtoken";

export const setCookie= (usr,res,sCode, message) =>{
    const token = jwt.sign({_id : usr._id},process.env.JWT_SECRT_CODE)

    console.log(process.env.NODE_ENV === "dev")

    res.status(sCode).cookie("token",token,{
        httpOnly : true,
        maxAge : 15 * 60 * 1000,
        sameSite : process.env.NODE_ENV === "dev" ? "lax" : "none",
        secure : process.env.NODE_ENV === "dev" ? false : true
    }).json({
        success : true,
        message
    })
}