
import {  DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import User from "./User";

export default class Organization extends Model {
  
  public orgId! : string
  public name! : string
  public description! : string
  public addUsers!: (user: User) => Promise<void>;
  
  
  static associate(models:any) {
    // define association here
    // Organization.belongsToMany(models.User, {through: "userorganization"})
  }
}

Organization.init({
  orgId: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    allowNull:false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'Organization',
  tableName: "organizations",
  timestamps: true
});

// Organization.associate (User);

// Organization.belongsToMany(User, {through: "userorganization"})

// User.belongsToMany(Organization, {through: "userorganization"})

