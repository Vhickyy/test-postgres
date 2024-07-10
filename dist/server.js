"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./database/connection"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const organizationRoute_1 = __importDefault(require("./routes/organizationRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome to user's organization project." });
});
app.use("/auth", userRoute_1.default);
app.use("/api", organizationRoute_1.default);
app.use("*", (req, res) => {
    return res.status(404).json({ sucess: false, message: "Route not found" });
});
app.listen(process.env.PORT || 5000, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.authenticate();
        connection_1.default.sync().then(() => {
            console.log('Database & tables created!');
        }).catch((err) => {
            console.error('Unable to sync database:', err);
        });
        // sequelize.drop({cascade:true})
        // sequelize.sync({ force: true }).then(() => {
        //     console.log('Database & tables created!');
        // }).catch((err) => {
        //     console.error('Unable to sync database:', err);
        // });
        // User.sync({}).then(()=>{
        //     console.log("sync");
        //   }).catch(()=>{
        //     console.log("hit");
        //   });
    }
    catch (error) {
        // console.log(error);
        // console.log("failed");
        process.exit(1);
    }
}));
// "builds": [
//         {
//             "src": "package.json",
//             "use": "@vercel/node",
//             "config": { "distDir": "dist" }
//         }
//     ],
