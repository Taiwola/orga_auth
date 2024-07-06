import express, {Request, Response} from "express";
import dotenv from "dotenv";
import { connect } from "./database/database-source";

dotenv.config();


import {authRouter} from "./routes/auth.route";
import {userRouter} from "./routes/user.route";
declare global {
    namespace Express {
      interface Request {
        user?: {
          userId?: string 
          email?: string
        };
      }
    }
  }

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));



app.use("/api/auth/", authRouter);
app.use("/api/users/", userRouter);


async function  startServer() {
    try {
        await connect();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    } catch (error) {
        console.error("Failed to connect to the database");
    }
}

startServer();
export default app;