"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = __importDefault(require("express"));
var auth_controller_1 = require("../controller/auth.controller");
var router = express_1.default.Router();
exports.authRouter = router;
router.post('/register', auth_controller_1.registerUser);
router.post('/login', auth_controller_1.loginUser);
//# sourceMappingURL=auth.route.js.map