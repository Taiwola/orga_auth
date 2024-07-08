"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var authentication_1 = require("../middleware/authentication");
var user_controller_1 = require("../controller/user.controller");
var router = express_1.default.Router();
exports.userRouter = router;
router.get('/:Id', authentication_1.authentication, user_controller_1.get_one_user);
//# sourceMappingURL=user.route.js.map