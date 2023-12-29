import express from "express";
import { getAllUsers, getLoggedIn, getMe, logout, register } from "../controllers/user.js";
import { isAuth } from "../middlewares/auth.js";


const router = express.Router();

router.get("/all",getAllUsers)

router.post("/new",register)
router.post("/login",getLoggedIn)
router.get("/logout",logout)

router.get("/me",isAuth, getMe)

export default router;