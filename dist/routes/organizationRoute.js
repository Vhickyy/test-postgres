"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMidleware_1 = __importDefault(require("../middleware/authMidleware"));
const organizationController_1 = require("../controllers/organizationController");
const OrganizationRoute = (0, express_1.Router)();
OrganizationRoute.get("/users/:id", organizationController_1.getUser);
OrganizationRoute.get("/organisations", authMidleware_1.default, organizationController_1.getUserOrganizations);
OrganizationRoute.get("/organisations/:orgId", authMidleware_1.default, organizationController_1.getOrganization);
OrganizationRoute.post("/organisations", authMidleware_1.default, organizationController_1.createOrganisation);
OrganizationRoute.post("/organisations/:orgId/users", organizationController_1.addUserToOrganization);
exports.default = OrganizationRoute;
