import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();
import { User } from "./enitites/user-model";
import { Organisation } from "./enitites/organisation-model";

export const connectionSource = new DataSource(
    {
        "type": "postgres",
        // "host": process.env.DB_HOST,
        "port": 5432,
        "url": process.env.DB_URL,
        // "username": process.env.DB_USER,
        // "password": process.env.DB_PASSWORD,
        // "database": process.env.DB_NAME,
        "synchronize": true,
        "logging": false,
        "entities": [User, Organisation],
        "migrations": ["src/migrations/**/*.ts"],
        "subscribers": ["src/subscribers/**/*.ts"],
        connectTimeoutMS: 10000,
        ssl: {
          rejectUnauthorized: false
        }
      }
      
);




export async function connect () {
  try {
    await connectionSource.initialize();
    console.log("connected to database")
  } catch (error) {
    console.error("Database connection error");
    console.error(error);
  }
}