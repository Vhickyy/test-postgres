import dotenv from "dotenv";
dotenv.config()
import { JwtPayload } from "jsonwebtoken";
import { generateToken, verifyToken } from "../utils/utils";

describe("Token", () => {

    it("should generate a token that expires at the correct time",() => {
        const user = { userId: 'testId', email: 'test@gmail.com', firstName: 'Test', lastName: 'Test', phone: '000000000', password: 'secretpassword' };
        const accessToken = generateToken(user.userId);
        const decoded  = verifyToken(accessToken) as { exp: number, iat: number };
        const expirationTime = 24 * 60 * 60; // ======= 1d ====== //
        const timeDifference =  decoded.exp - decoded.iat;
        expect(timeDifference).toEqual(expirationTime);
    });

    it('should include correct user details in the token', () => {
        const user = { userId: 'testId', email: 'test@gmail.com', firstName: 'Test', lastName: 'Test', phone: '000000000', password: 'secretpassword' };
        const accessToken = generateToken(user.userId);
        const decoded  = verifyToken(accessToken) as JwtPayload;
        expect(decoded.userId).toBe(user.userId)
    })
    
})