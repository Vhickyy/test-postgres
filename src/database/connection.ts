import { Sequelize } from "sequelize";
import * as pg from "pg"; 
import * as dotenv from "dotenv";

dotenv.config()
// process.env.URI!
const sequelize = new Sequelize(
    process.env.URI!,
    process.env.USERNAME!,
    process.env.POSTGRESDB!
    , {
    dialect: 'postgres',
    dialectModule: pg,
    port: Number(process.env.DB_PORT!),
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

export default sequelize;