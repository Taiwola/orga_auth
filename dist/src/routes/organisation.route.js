"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orgRouter = void 0;
var express_1 = __importDefault(require("express"));
var authentication_1 = require("../middleware/authentication");
var organisation_controller_1 = require("../controller/organisation.controller");
var router = express_1.default.Router();
exports.orgRouter = router;
router.get("", authentication_1.authentication, organisation_controller_1.get_all_org);
router.get("/:Id", authentication_1.authentication, organisation_controller_1.get_one_org);
router.post("", authentication_1.authentication, organisation_controller_1.create_org);
router.post("/:Id/users", authentication_1.authentication, organisation_controller_1.add_UserTo_Org);
//# sourceMappingURL=organisation.route.js.map