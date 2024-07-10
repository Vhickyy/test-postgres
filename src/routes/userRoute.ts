import { Router } from "express";
import {  loginUser, registerUser } from "../controllers/userController";
import authMiddleware from "../middleware/authMidleware";
import { registerValidation } from "../middleware/validatorMiddleware";

const userRouter = Router();

userRouter.post("/register",registerValidation,registerUser)
userRouter.post("/login",loginUser)

export default userRouter;