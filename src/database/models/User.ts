
import {  DataTypes, Model, ModelStatic } from "sequelize";
import sequelize from "../connection";
import Organization from "./Organization";

export default class User extends Model {

  public userId!: string
  public password!: string
  public firstName!:string
  public lastName! : string
  public email!:string
  public phone!: string
  public addOrganizations!: (organization: Organization) => Promise<void>;
  public getOrganizations!: (options?: any) => Promise<Organization[]>;
  
  static associate(models: any) {
    //   // define association here
    // User.belongsToMany(models.Organization, {through: "userorganization"})
  }
}

User.init({
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    allowNull:false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique:true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone:{
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: "users",
  timestamps: true
});

User.belongsToMany(Organization, {through: "userorganization"})

Organization.belongsToMany(User, {through: "userorganization"})


