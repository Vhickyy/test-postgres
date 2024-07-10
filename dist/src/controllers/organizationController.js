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
exports.addUserToOrganization = exports.createOrganisation = exports.getOrganization = exports.getUserOrganizations = exports.getUser = void 0;
const User_1 = __importDefault(require("../database/models/User"));
const Organization_1 = __importDefault(require("../database/models/Organization"));
const uuid_1 = require("uuid");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ status: "Bad equest", message: "id is required" });
    try {
        const user = yield User_1.default.findByPk(req.user);
        // ======== Requesting your identity ========== //
        if (id === req.user) {
            const _a = user === null || user === void 0 ? void 0 : user.toJSON(), { password } = _a, rest = __rest(_a, ["password"]);
            return res.status(201).json({ status: "success", message: "user sent", data: { rest } });
        }
        // =========== Requesting Identity of another user ======== //
        const differentUser = yield User_1.default.findByPk(id);
        const organization = yield (user === null || user === void 0 ? void 0 : user.getOrganizations());
        const differentUserOrganization = yield (differentUser === null || differentUser === void 0 ? void 0 : differentUser.getOrganizations());
        const sharedOrg = differentUserOrganization === null || differentUserOrganization === void 0 ? void 0 : differentUserOrganization.find((org) => organization === null || organization === void 0 ? void 0 : organization.find(org2 => org2.orgId == org.orgId));
        if (!sharedOrg) {
            return res.status(400).json({ status: "Bad Request", message: "You are not allowed to access this resource." });
        }
        const _b = differentUser === null || differentUser === void 0 ? void 0 : differentUser.toJSON(), { password } = _b, rest = __rest(_b, ["password"]);
        return res.status(201).json({ status: "success", message: "user sent", data: { rest } });
    }
    catch (error) {
        return res.status(400).json({ status: "Bad Request", message: "You are not allowed to access this resource." });
    }
});
exports.getUser = getUser;
const getUserOrganizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByPk(req.user);
        const organisations = yield (user === null || user === void 0 ? void 0 : user.getOrganizations());
        return res.status(200).json({ status: "success", message: "Orgsnisations sent successful", data: { organisations } });
    }
    catch (error) {
        return res.status(500).json({ status: "failed", message: "Internal server error" });
    }
});
exports.getUserOrganizations = getUserOrganizations;
const getOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ status: "Bad Request", message: "id is required" });
    try {
        const user = yield User_1.default.findByPk(req.user);
        const organisation = yield (user === null || user === void 0 ? void 0 : user.getOrganizations({ where: { orgId: req.params.orgId } }));
        if (!organisation)
            return res.status(404).json({ message: "No organisation found with that orgId for you." });
        const data = organisation === null || organisation === void 0 ? void 0 : organisation.map(org => org.toJSON());
        // const data:any = []
        return res.status(200).json({ status: "success", message: "Orgsnisation sent successful", data });
    }
    catch (error) {
        console.log({ e: error.message });
        // return res.status(500).json({status:"failed",message:"Internal server error"})
    }
});
exports.getOrganization = getOrganization;
const createOrganisation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name)
        return res.status(400).json({ status: "Bad Request", message: "Client error", statusCode: 400 });
    try {
        const user = yield User_1.default.findByPk(req.user);
        const organisation = yield Organization_1.default.create(Object.assign(Object.assign({}, req.body), { orgId: (0, uuid_1.v4)() }));
        yield (user === null || user === void 0 ? void 0 : user.addOrganizations(organisation));
        return res.status(201).json({ status: "success", message: "Orgsnisation created successfully", data: organisation.toJSON() });
    }
    catch (error) {
        return res.status(400).json({ status: "Bad Request", message: "Client error", statusCode: 400 });
    }
});
exports.createOrganisation = createOrganisation;
const addUserToOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const { orgId } = req.params;
    if (!userId || !orgId)
        return res.status(400).json({ status: "Bad Request", message: "userId and orgId are required" });
    try {
        const user = yield User_1.default.findByPk(userId);
        const organization = yield Organization_1.default.findByPk(orgId);
        console.log({ organization, user });
        if (organization && user) {
            console.log("hry");
            yield (organization === null || organization === void 0 ? void 0 : organization.addUsers(user));
            console.log("yoo");
        }
        return res.status(200).json({ status: "success", messsage: "User added to organisation successfully" });
    }
    catch (error) {
        console.log({ e: error.message });
        return res.status(500).json({ status: "failed", message: "Internal server error" });
    }
});
exports.addUserToOrganization = addUserToOrganization;
