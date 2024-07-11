import { Request,Response } from "express";
import User from "../database/models/User";
import Organization from "../database/models/Organization"
import { where } from "sequelize";
import {v4} from "uuid"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/utils";

export const registerUser = async (req:Request,res:Response) => {
    const {firstName, password, email} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    try {
        const userExist = await User.findOne({where: {email}});
        if(userExist) return res.status(400).json({status:"Bad request",message:"Email already exist",statusCode:400})
        const user = await User.create({...req.body,userId:v4(),password:hashPassword});
        const organisation = await Organization.create({orgId:v4(),name:`${firstName}'s Organization`})
        await user.addOrganizations(organisation)
        const {password,...rest} = user.toJSON();
        const accessToken = generateToken(rest.userId);
        return res.status(201).json({status:"success",message:"Registration successful",data:{accessToken,user:rest}})
    } catch (error:any) {
        console.log({error:error.message});
        
        return res.status(400).json({status:"Bad request",message:"Registration unsuccessful",error,statusCode:400})
    }
}

export const loginUser = async (req:Request,res:Response) => {
    const {email,password:userPassword} = req.body;
    try {
        const user = await User.findOne({ where:{email}})
        const comparePassword = user ? bcrypt.compare(userPassword, user.password) : null;
        if(!user || !comparePassword) return res.status(401).json({status:"Bad request",message:"Authentication failed",statusCode:401});
        const {password,...rest} = user?.toJSON();
        const accessToken = generateToken(rest.userId);
        return res.status(200).json({status:"success",message:"login successful",data:{accessToken,user:rest}})
    } catch (error) {
        return res.status(401).json({status:"Bad request",message:"Authentication failed",statusCode:401})
    }
}

