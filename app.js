import express from "express";
import UserRouter from "./routes/user.js"
import TaskRouter from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.js";
import cors from "cors"


export const app = express();

//app.use(bodyParser.urlencoded({extended:false}));

config({
    path : "./data/config.env"
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : [process.env.FRTEND_URL],
    methods : ["GET", "POST", "PUT", "DELETE"],
    credentials : true,
}))

app.use("/api/v1/user",UserRouter)
app.use("/api/v1/task",TaskRouter)

app.use(errorHandler)
