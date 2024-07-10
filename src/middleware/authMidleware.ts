import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { IRequest } from "../types/types";
import { verifyToken } from "../utils/utils";



const authMiddleware = async (req:IRequest,res:Response,next:NextFunction) => {
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            const token = req.headers.authorization.split(" ")[1];
            const {userId}  = verifyToken(token) as JwtPayload;
            req.user = userId;
            next()
        } catch (error) {
            res.status(401);
            throw new Error("Unauthorized to access this route!!")
        }
    }
    else{
        res.status(401);
        throw new Error("Unauthorized to access this route!!")
    }
    
}

export default authMiddleware;