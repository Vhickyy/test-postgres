"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const Organization_1 = __importDefault(require("./Organization"));
class User extends sequelize_1.Model {
    static associate(models) {
        //   // define association here
        // User.belongsToMany(models.Organization, {through: "userorganization"})
    }
}
exports.default = User;
User.init({
    userId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: connection_1.default,
    modelName: 'User',
    tableName: "users",
    timestamps: true
});
User.belongsToMany(Organization_1.default, { through: "userorganization" });
Organization_1.default.belongsToMany(User, { through: "userorganization" });
