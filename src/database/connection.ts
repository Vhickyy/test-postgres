import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";

dotenv.config()

const sequelize = new Sequelize(process.env.URI!, {
    dialect: 'postgres'
})

export default sequelize;