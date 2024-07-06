import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();

export const connectionSource = new DataSource(
    {
        "type": "postgres",
        "host": process.env.DB_HOST,
        "port": 5432,
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "synchronize": true,
        "logging": false,
        "entities": ["src/database/entities/**/*.ts"],
        "migrations": ["src/migrations/**/*.ts"],
        "subscribers": ["src/subscribers/**/*.ts"],
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