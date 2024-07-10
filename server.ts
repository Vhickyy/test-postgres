import * as dotenv from "dotenv"
dotenv.config();
import express, { Request, Response } from "express"
import sequelize from "./src/database/connection";
import userRouter from "./src/routes/userRoute";
import OrganizationRoute from "./src/routes/organizationRoute";

const app = express();

app.use(express.json())

app.get("/",(req,res) => {
    return res.status(200).json({message:"Welcome to user's organization project."})
})
app.use("/auth",userRouter);
app.use("/api",OrganizationRoute);
app.use("*",(req:Request,res:Response) => {
    return res.status(404).json({sucess: false, message: "Route not found"});
})

app.listen(process.env.PORT, async () => {
    try {
        await sequelize.authenticate(); 
        sequelize.sync().then(() => {
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
    } catch (error:any) {
        // console.log(error);
        // console.log("failed");
        process.exit(1)
    }
})