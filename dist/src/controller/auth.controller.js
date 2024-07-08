"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
var validator_1 = require("../utils/validator");
var service_1 = require("../service");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var token_1 = require("../middleware/token");
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, errorMessages, dataBody, userExist, hashpwd, userOptions, user, orgOptions, password, userWithoutPassword, assessToken, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                error = validator_1.registerValidator.validate(req.body, { abortEarly: false }).error;
                if (error) {
                    errorMessages = error.details.map(function (detail) { return detail.message; });
                    return [2 /*return*/, res.status(422).json({ errors: errorMessages })];
                }
                dataBody = req.body;
                return [4 /*yield*/, (0, service_1.getUserEmail)(dataBody.email)];
            case 1:
                userExist = _a.sent();
                if (userExist) {
                    return [2 /*return*/, res.status(409).json({ status: 'Conflict', message: 'This email is already in use', statusCode: 409 })];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(dataBody.password, 10)];
            case 2:
                hashpwd = _a.sent();
                userOptions = __assign(__assign({}, dataBody), { password: hashpwd });
                return [4 /*yield*/, (0, service_1.createUser)(userOptions)];
            case 3:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({
                            status: "Bad Request",
                            message: "Registration unsuccessful",
                            statusCode: 400
                        })];
                }
                orgOptions = {
                    name: "".concat(user.firstName, "Organisation"),
                    description: "This is the default organisation for ".concat(user.firstName, " ").concat(user.lastName, "."),
                    users: [user],
                };
                return [4 /*yield*/, (0, service_1.createOrganisation)(orgOptions)];
            case 4:
                _a.sent();
                password = user.password, userWithoutPassword = __rest(user, ["password"]);
                return [4 /*yield*/, (0, token_1.generateJwt)(user.email, user.userId)];
            case 5:
                assessToken = _a.sent();
                return [2 /*return*/, res.status(201).json({
                        status: 'success',
                        message: 'Registration successful',
                        data: {
                            accessToken: assessToken,
                            user: userWithoutPassword
                        }
                    })];
            case 6:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({
                        status: 'Internal Server Error',
                        message: 'An error occurred during registration',
                        statusCode: 500
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, errorMessages, _a, email, password, user, pwd, accessToken, pwduser, userwithoutpwd, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                error = validator_1.loginValidator.validate(req.body, { abortEarly: false }).error;
                if (error) {
                    errorMessages = error.details.map(function (detail) { return detail.message; });
                    return [2 /*return*/, res.status(422).json({ errors: errorMessages })];
                }
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, service_1.getUserEmail)(email)];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            status: "NotFound",
                            message: "Invalid credential",
                            statusCode: 404
                        })];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 2:
                pwd = _b.sent();
                if (!pwd)
                    return [2 /*return*/, res.status(401).json({
                            status: "Bad Request",
                            message: "Invalid credentials",
                            statusCode: 401
                        })];
                return [4 /*yield*/, (0, token_1.generateJwt)(user.email, user.userId)];
            case 3:
                accessToken = _b.sent();
                pwduser = user.password, userwithoutpwd = __rest(user, ["password"]);
                return [2 /*return*/, res.status(200).json({
                        status: "successful",
                        message: "Login successful",
                        data: {
                            accessToken: accessToken,
                            user: userwithoutpwd
                        }
                    })];
            case 4:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).json({
                        status: 'Internal Server Error',
                        message: 'An error occurred during login',
                        statusCode: 500
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
//# sourceMappingURL=auth.controller.js.map