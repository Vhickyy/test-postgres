"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const organizationController_1 = require("../controllers/organizationController");
// import Organization from "../database/models/Organization"
// import User from "../database/models/User";
// import dotenv from "dotenv"
// dotenv.config()
jest.mock("../database/models/User", () => ({
// BelongsToMany: jest.fn(),
// findByPk: jest.fn().mockResolvedValueOnce({})
}));
jest.mock("../database/models/Organization");
const mockRequest = {
    params: {
        id: "1",
        orgId: "uuid1"
    }
};
const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};
describe("Organization", () => {
    test("yoo", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockOrganization = [{ toJSON: () => ({ id: "uuid1", name: 'Org1' }) }];
        const mockUser = { id: 1 };
        mockUser.getOrganizations = jest.fn().mockResolvedValueOnce([
            { id: 'uuid1', name: 'Org1', toJSON: () => ({ id: 'uuid1', name: 'Org1' }) }
        ]);
        // (User.findByPk as any).mockResolvedValueOnce(mockUser);
        const user = mockUser;
        // await getOrganization(mockRequest, mockResponse);
        // jest.spyOn(User, 'findByPk').mockResolvedValueOnce(mockUser);
        // jest.spyOn(User, "belongsToMany").mockResolvedValueOnce(mockUser as never);
        // Mocking user.getOrganizations to return a mock organization
        jest.spyOn(mockUser, 'getOrganizations').mockResolvedValueOnce(mockOrganization);
        const organisation = yield (0, organizationController_1.getOrganization)(mockRequest, mockResponse);
        console.log({ organisation });
        expect([]).toHaveLength(0);
    }));
});
