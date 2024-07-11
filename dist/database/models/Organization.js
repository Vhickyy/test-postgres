"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
class Organization extends sequelize_1.Model {
    static associate(models) {
        // define association here
        // Organization.belongsToMany(models.User, {through: "userorganization"})
    }
}
exports.default = Organization;
Organization.init({
    orgId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: connection_1.default,
    modelName: 'Organization',
    tableName: "organizations",
    timestamps: true
});
// Organization.associate (User);
// Organization.belongsToMany(User, {through: "userorganization"})
// User.belongsToMany(Organization, {through: "userorganization"})
