import express from "express";
import dotenv from "dotenv";
import { connect } from "./database/database-source";

dotenv.config();

const app = express.application;
const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));



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