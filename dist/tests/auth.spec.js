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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
const User_1 = __importDefault(require("../database/models/User"));
const connection_1 = __importDefault(require("../database/connection"));
const Organization_1 = __importDefault(require("../database/models/Organization"));
describe("Auth endpoint", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection_1.default.authenticate();
        yield connection_1.default.sync({ alter: true });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection_1.default.drop();
        yield connection_1.default.close();
    }));
    it('register user with default organisation', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            firstName: 'test',
            lastName: 'test',
            email: 'test@gmail.com',
            password: 'secretpassword',
            phone: '00000',
        };
        const response = yield (0, supertest_1.default)(server_1.app).post('/auth/register').send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Registration successful');
        expect(response.body.data.accessToken).toBeDefined();
        expect(response.body.data.user.firstName).toBe(newUser.firstName);
        expect(response.body.data.user.lastName).toBe(newUser.lastName);
        expect(response.body.data.user.email).toBe(newUser.email);
        const user = yield User_1.default.findByPk(response.body.data.user.userId, { include: [Organization_1.default] });
        // ========== Check if the organization was created correctly ========= //
        const organization = user === null || user === void 0 ? void 0 : user.dataValues.Organizations[0];
        expect(organization.name).toBe(`${newUser.firstName}'s Organization`);
    }));
    it('login with wrong credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { email: 'test@gmail,com', password: 'secretsecret' };
        const response = yield (0, supertest_1.default)(server_1.app).post('/auth/login').send(user);
        expect(response.statusCode).toBe(401);
        expect(response.body.status).toBe('Bad request');
        expect(response.body.message).toBe('Authentication failed');
    }));
    it('duplicate email', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            firstName: 'test',
            lastName: 'test',
            email: 'test@gmail.com',
            password: 'secretpassword',
            phone: '00000',
        };
        const response = yield (0, supertest_1.default)(server_1.app).post('/auth/register').send(newUser);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Email already exist');
    }));
    it('login user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { email: 'test@gmail.com', password: 'secretpassword' };
        const response = yield (0, supertest_1.default)(server_1.app).post('/auth/login').send(user);
        expect(response.statusCode).toBe(200);
    }));
});
