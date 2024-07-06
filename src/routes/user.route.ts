import express from "express";
import { authentication } from "../middleware/authentication";
import { get_one_user } from "../controller/user.controller";

const router = express.Router();


router.get('/:Id', authentication, get_one_user);


export {router as userRouter}