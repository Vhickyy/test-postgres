import { Request, Response } from "express";
import User from "../database/models/User";
import { IRequest } from "../types/types";
import Organization from "../database/models/Organization";
import { v4 } from "uuid";

export const getUser = async (req:IRequest,res:Response) => {
    const {id} = req.params;
    if(!id) return res.status(400).json({status:"Bad equest",message:"id is required"});
    req.user = "aad3bddd-3bf8-46a3-9b96-51d4d4e4b7cb"
    try {
        const user = await User.findByPk(req.user); 
        if(!user) return res.status(400).json({status:"Bad Request",message:"Invalid User."})
        // ======== Requesting your identity ========== //
        if(id === req.user) {
            const {password,...rest} = user?.toJSON()
            return res.status(201).json({status:"success",message:"user sent",data:{rest}})
        }

        // =========== Requesting Identity of another user ======== //
        const differentUser = await User.findByPk(id);
        const organization = await user?.getOrganizations();
        const differentUserOrganization = await differentUser?.getOrganizations();
        const sharedOrg = differentUserOrganization?.find((org: any) => organization?.find(org2 => org2.orgId == org.orgId));
        
        if(!sharedOrg){
            return res.status(400).json({status:"Bad Request",message:"You are not allowed to access this resource."})
        }

        const {password,...rest} = differentUser?.toJSON()
        return res.status(201).json({status:"success",message:"user sent",data:{rest}})
    } catch (error:any) {
        return res.status(400).json({status:"Bad Request",message:"You are not allowed to access this resource."})
    }
} 


export const getUserOrganizations = async (req:IRequest,res:Response) => {
    try {
        req.user = "aad3bddd-3bf8-46a3-9b96-51d4d4e4b7cb"
        const user = await User.findByPk(req.user);
        const organisations = await user?.getOrganizations();
        return res.status(200).json({status:"success",message:"Orgsnisations sent successful",data:{organisations}})
    } catch (error) {
        return res.status(500).json({status:"failed",message:"Internal server error"})
    }
}

export const getOrganization = async (req:IRequest,res:Response) => {
    const {id} = req.params;
    if(!id) return res.status(400).json({status:"Bad Request",message:"id is required"})
    try {
        const user = await User.findByPk(req.user);
        const organisation = await user?.getOrganizations({ where: { orgId: req.params.orgId } })
        if(!organisation) return res.status(404).json({message:"No organisation found with that orgId for you."})
        const data = organisation?.map(org => org.toJSON())
        // const data:any = []
        return res.status(200).json({status:"success",message:"Orgsnisation sent successful",data})
    } catch (error:any) {
        console.log({e:error.message});
        
        // return res.status(500).json({status:"failed",message:"Internal server error"})
    }
}

export const createOrganisation = async (req:IRequest,res:Response) => {
    const {name} = req.body;
    if(!name) return res.status(400).json({status:"Bad Request",message:"Client error",statusCode: 400})
    try {
        const user = await User.findByPk(req.user);
        const organisation = await Organization.create({...req.body,orgId:v4()});
        await user?.addOrganizations(organisation);
        return res.status(201).json({status:"success",message:"Orgsnisation created successfully",data:organisation.toJSON()})
    } catch (error) {
        return res.status(400).json({status:"Bad Request",message:"Client error",statusCode: 400})
    }
}

export const addUserToOrganization = async (req:IRequest,res:Response) => {
    const {userId} = req.body;
    const {orgId} = req.params;
    if(!userId || !orgId) return res.status(400).json({status:"Bad Request",message:"userId and orgId are required"});
    try {
        const user = await User.findByPk(userId)
        const organization = await Organization.findByPk(orgId);
        console.log({organization,user});
        
        if(organization && user) {
            console.log("hry");
            
            await organization?.addUsers(user);
            console.log("yoo");
            
        }
        return res.status(200).json({status:"success",messsage:"User added to organisation successfully"});
    } catch (error:any) {
        console.log({e:error.message});
        
        return res.status(500).json({status:"failed",message:"Internal server error"});
    }
}

