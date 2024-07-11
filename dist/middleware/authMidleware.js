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
const utils_1 = require("../utils/utils");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const { userId } = (0, utils_1.verifyToken)(token);
            req.user = userId;
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error("Unauthorized to access this route!!");
        }
    }
    else {
        res.status(401);
        throw new Error("Unauthorized to access this route!!");
    }
});
exports.default = authMiddleware;
