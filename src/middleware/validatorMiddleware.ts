import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";


const validationLayer = (validations: any) => {
    return ([
        validations,
        (req:Request,res:Response,next:NextFunction) => {
            const errorsResult = validationResult(req);
            if(!errorsResult.isEmpty()){
                const errors = errorsResult.array().map((err:any) => {
                    return {field: err.path, message: err.msg}
                });
                return res.status(422).json({errors});
            }
            next()
        }
    ])
}


export const registerValidation = validationLayer([
    body("email").notEmpty().withMessage("email is required").isEmail().withMessage("Please provide a valid email."),
    body("password").notEmpty().withMessage("password is required"),
    body("firstName").notEmpty().withMessage("firstName is required"),
    body("lastName").notEmpty().withMessage("lastName is required"),
]);