"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validatorMiddleware_1 = require("../middleware/validatorMiddleware");
const userRouter = (0, express_1.Router)();
userRouter.post("/register", validatorMiddleware_1.registerValidation, userController_1.registerUser);
userRouter.post("/login", userController_1.loginUser);
exports.default = userRouter;
