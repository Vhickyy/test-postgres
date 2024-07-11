import { Router } from "express";
import authMiddleware from "../middleware/authMidleware";
import { getUserOrganizations, getUser, addUserToOrganization, getOrganization, createOrganisation } from "../controllers/organizationController";

const OrganizationRoute = Router();

OrganizationRoute.get("/users/:id",getUser)
OrganizationRoute.get("/organisations",authMiddleware,getUserOrganizations)
OrganizationRoute.get("/organisations/:orgId",authMiddleware,getOrganization)
OrganizationRoute.post("/organisations",authMiddleware,createOrganisation)
OrganizationRoute.post("/organisations/:orgId/users",addUserToOrganization)

export default OrganizationRoute