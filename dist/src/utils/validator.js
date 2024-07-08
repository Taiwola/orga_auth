"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrgValidator = exports.loginValidator = exports.registerValidator = void 0;
var joi_1 = __importDefault(require("joi"));
var response_1 = require("./response");
exports.registerValidator = joi_1.default.object({
    firstName: joi_1.default.string().min(3).max(50).required().messages(response_1.firstNameMessages),
    lastName: joi_1.default.string().min(3).max(50).required().messages(response_1.lastNameMessages),
    email: joi_1.default.string().email().required().messages(response_1.emailMessages),
    password: joi_1.default.string().min(3).max(50).required().messages(response_1.passwordMessages),
    phone: joi_1.default.string().min(10).required().messages(response_1.phoneMessages)
});
exports.loginValidator = joi_1.default.object({
    email: joi_1.default.string().email().required().messages(response_1.emailMessages),
    password: joi_1.default.string().min(3).max(50).required().messages(response_1.passwordMessages)
});
exports.createOrgValidator = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).required().messages(response_1.nameMessages),
    description: joi_1.default.string().optional()
});
//# sourceMappingURL=validator.js.map