import express from "express";
import { loginUser, registerUser } from "../controller/auth.controller";


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);


export {router as authRouter}