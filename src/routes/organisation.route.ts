import express from "express";
import { authentication } from "../middleware/authentication";
import { create_org, get_all_org, get_one_org } from "../controller/organisation.controller";

const router = express.Router();


router.get("", authentication, get_all_org);
router.get("/:Id", authentication, get_one_org);
router.post("", authentication, create_org);



export {router as orgRouter}