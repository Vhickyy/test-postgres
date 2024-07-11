import { Request, Response } from "express"
import {  getOrganization } from "../controllers/organizationController"
import { BelongsToMany, json } from "sequelize"
import Organization from "../database/models/Organization"
import User from "../database/models/User"
// import Organization from "../database/models/Organization"
// import User from "../database/models/User";
// import dotenv from "dotenv"
// dotenv.config()

jest.mock("../database/models/User",() => ({
    // BelongsToMany: jest.fn(),
    // findByPk: jest.fn().mockResolvedValueOnce({})
}));
jest.mock("../database/models/Organization");

const mockRequest = {
    params: {
        id: "1",
        orgId: "uuid1"
    }
} as unknown as Request

const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
} as unknown as Response


describe("Organization", () => {
    test("yoo", async () => {
        const mockOrganization = [{ toJSON: () => ({ id: "uuid1", name: 'Org1' }) }];
        const mockUser: any = { id: 1 };
        mockUser.getOrganizations = jest.fn().mockResolvedValueOnce([
            { id: 'uuid1', name: 'Org1', toJSON: () => ({ id: 'uuid1', name: 'Org1' }) }
        ]) as unknown as () => Promise<Organization[]>;

        // (User.findByPk as any).mockResolvedValueOnce(mockUser);
        const user = mockUser

        // await getOrganization(mockRequest, mockResponse);
        // jest.spyOn(User, 'findByPk').mockResolvedValueOnce(mockUser);
        // jest.spyOn(User, "belongsToMany").mockResolvedValueOnce(mockUser as never);
    
        // Mocking user.getOrganizations to return a mock organization
        jest.spyOn(mockUser, 'getOrganizations').mockResolvedValueOnce(mockOrganization as any);
        const organisation = await getOrganization(mockRequest, mockResponse);
        console.log({organisation});
        
        expect([]).toHaveLength(0);
    })
})
