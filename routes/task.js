import express from "express";
import { delTask, getMyTask, newTask, updateTask } from "../controllers/task.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new",isAuth,newTask)

router.get("/my",isAuth,getMyTask)

router.route("/:id").put(isAuth,updateTask).delete(isAuth,delTask)

export default router