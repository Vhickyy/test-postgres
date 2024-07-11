import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import * as pg from "pg";

dotenv.config()

// process.env.URI!
const sequelize = new Sequelize(process.env.URI!, {
    dialect: 'postgres',
    dialectModule: pg,
    port: Number(process.env.DB_PORT!),
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // }
})

export default sequelize;