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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../database/models/User"));
const Organization_1 = __importDefault(require("../database/models/Organization"));
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../utils/utils");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, password, email } = req.body;
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashPassword = yield bcryptjs_1.default.hash(password, salt);
    try {
        const userExist = yield User_1.default.findOne({ where: { email } });
        if (userExist)
            return res.status(400).json({ status: "Bad request", message: "Email already exist", statusCode: 400 });
        const user = yield User_1.default.create(Object.assign(Object.assign({}, req.body), { userId: (0, uuid_1.v4)(), password: hashPassword }));
        const organisation = yield Organization_1.default.create({ orgId: (0, uuid_1.v4)(), name: `${firstName}'s Organization` });
        yield user.addOrganizations(organisation);
        const _a = user.toJSON(), { password } = _a, rest = __rest(_a, ["password"]);
        const accessToken = (0, utils_1.generateToken)(rest.userId);
        return res.status(201).json({ status: "success", message: "Registration successful", data: { accessToken, user: rest } });
    }
    catch (error) {
        return res.status(400).json({ status: "Bad request", message: "Registration unsuccessful", statusCode: 400 });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password: userPassword } = req.body;
    try {
        const user = yield User_1.default.findOne({ where: { email } });
        const comparePassword = user ? bcryptjs_1.default.compare(userPassword, user.password) : null;
        if (!user || !comparePassword)
            return res.status(401).json({ status: "Bad request", message: "Authentication failed", statusCode: 401 });
        const _a = user === null || user === void 0 ? void 0 : user.toJSON(), { password } = _a, rest = __rest(_a, ["password"]);
        const accessToken = (0, utils_1.generateToken)(rest.userId);
        return res.status(200).json({ status: "success", message: "login successful", data: { accessToken, user: rest } });
    }
    catch (error) {
        return res.status(401).json({ status: "Bad request", message: "Authentication failed", statusCode: 401 });
    }
});
exports.loginUser = loginUser;
