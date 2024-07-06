import express from "express";
import { authentication } from "../middleware/authentication";
import { add_UserTo_Org, create_org, get_all_org, get_one_org } from "../controller/organisation.controller";

const router = express.Router();


router.get("", authentication, get_all_org);
router.get("/:Id", authentication, get_one_org);
router.post("", authentication, create_org);
router.post("/:Id/users", authentication, add_UserTo_Org)



export {router as orgRouter}