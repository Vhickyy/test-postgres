import * as dotenv from "dotenv"
dotenv.config();
import express, { NextFunction, Request, Response } from "express"
import sequelize from "./database/connection";
import userRouter from "./routes/userRoute";
import OrganizationRoute from "./routes/organizationRoute";

export const app = express();

app.use(express.json())

app.get("/",(req,res) => {
    return res.status(200).json({message:"Welcome to user's organization project."})
})
app.use("/auth",userRouter);
app.use("/api",OrganizationRoute);
app.use("*",(req:Request,res:Response) => {
    return res.status(404).json({sucess: false, message: "Route not found"});
})
app.use((err:any,req:Request,res:Response,next:NextFunction) => {
    console.log({msg:err.message});
    let status =  res.statusCode || 500;
    if(err.message == 'fetch failed'){
        status = 400;
    }
    let message = err.message || "Internal Server Error";
    if(err.code == 11000){
        status = 400
        message = "You have reviewed this book already"
    }
    return res.status(status).json({message})
})

// app.listen(process.env.PORT || 5000, async () => {
//         try {
//             await sequelize.authenticate(); 
//             sequelize.sync().then(() => {
//                 console.log('Database & tables created!');
//             }).catch((err) => {
//                 console.error('Unable to sync database:', err);
//             });
//             // sequelize.drop({cascade:true})
//             // sequelize.sync({ force: true }).then(() => {
//             //     console.log('Database & tables created!');
//             // }).catch((err) => {
//             //     console.error('Unable to sync database:', err);
//             // });
//         } catch (error:any) {
//             console.log(error);
//             process.exit(1)
//         }
//     });

const server = () => { app.listen(process.env.PORT || 5000, async () => {
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
    } catch (error:any) {
        // console.log(error);
        process.exit(1)
    }
});
}

server()

// "builds": [
//         {
//             "src": "package.json",
//             "use": "@vercel/node",
//             "config": { "distDir": "dist" }
//         }
//     ],

// "builds": [
//         {
//             "src": "/dist/server.js",
//             "use": "@vercel/node"
//         }
//     ],

// {
//     "version": 2,
//     "builds": [
//         {
//             "src": "/dist/server.js",
//             "use": "@vercel/node"
//         }
//     ],
//     "routes": [
//         {
//              "src": "/(.*)",
//               "dest": "/dist/server.js"
//         }
//     ]
// }

// {
//     "rewrites": [{"source":"/src/(.*)", "destination": "/src"}]
// }
