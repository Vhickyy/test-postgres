"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const utils_1 = require("../utils/utils");
describe("Token", () => {
    it("should generate a token that expires at the correct time", () => {
        const user = { userId: 'testId', email: 'test@gmail.com', firstName: 'Test', lastName: 'Test', phone: '000000000', password: 'secretpassword' };
        const accessToken = (0, utils_1.generateToken)(user.userId);
        const decoded = (0, utils_1.verifyToken)(accessToken);
        const expirationTime = 24 * 60 * 60; // ======= 1d ====== //
        const timeDifference = decoded.exp - decoded.iat;
        expect(timeDifference).toEqual(expirationTime);
    });
    it('should include correct user details in the token', () => {
        const user = { userId: 'testId', email: 'test@gmail.com', firstName: 'Test', lastName: 'Test', phone: '000000000', password: 'secretpassword' };
        const accessToken = (0, utils_1.generateToken)(user.userId);
        const decoded = (0, utils_1.verifyToken)(accessToken);
        expect(decoded.userId).toBe(user.userId);
    });
});
