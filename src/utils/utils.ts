import jwt from "jsonwebtoken"

export const generateToken = (userId:string) => {
    const accessToken = jwt.sign({userId},process.env.JWT_SECRET!,{expiresIn: process.env.JWT_EXPIRE});
    return accessToken;
}

export const verifyToken = (token:string) => {
    return jwt.verify(token,process.env.JWT_SECRET!);
}