"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_UserTo_Org = exports.create_org = exports.get_one_org = exports.get_all_org = void 0;
var service_1 = require("../service");
var validator_1 = require("../utils/validator");
var get_all_org = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var organisation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, service_1.getAllOrg)()];
            case 1:
                organisation = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        status: "success",
                        message: "Organisations",
                        data: organisation
                    })];
        }
    });
}); };
exports.get_all_org = get_all_org;
var get_one_org = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, userId, organisation, hasAccess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                userId = req.user.userId;
                return [4 /*yield*/, (0, service_1.getOneOrg)(Id)];
            case 1:
                organisation = _a.sent();
                console.log(organisation);
                if (!organisation) {
                    return [2 /*return*/, res.status(404).json({
                            status: "Not Found",
                            message: "Organisation does not exist",
                            statusCode: 404
                        })];
                }
                hasAccess = organisation.users.some(function (u) { return u.userId === userId; });
                if (!hasAccess) {
                    return [2 /*return*/, res.status(403).json({
                            status: 'Forbidden',
                            message: 'You do not have access to view this organisation',
                            statusCode: 403
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        status: "success",
                        message: "Organisation found",
                        data: organisation
                    })];
        }
    });
}); };
exports.get_one_org = get_one_org;
var create_org = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, errorMessages, dataBody, org;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = validator_1.createOrgValidator.validate(req.body, { abortEarly: false }).error;
                if (error) {
                    errorMessages = error.details.map(function (detail) { return detail.message; });
                    return [2 /*return*/, res.status(422).json({ errors: errorMessages })];
                }
                dataBody = req.body;
                return [4 /*yield*/, (0, service_1.createOrganisation)(dataBody)];
            case 1:
                org = _a.sent();
                if (!org) {
                    return [2 /*return*/, res.status(400).json({
                            status: "Bad Request",
                            message: "Client error",
                            statusCode: 400
                        })];
                }
                return [2 /*return*/, res.status(201).json({
                        status: "success",
                        message: "Organisation created successfully",
                        data: org
                    })];
        }
    });
}); };
exports.create_org = create_org;
var add_UserTo_Org = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, Id, org, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userId = req.body.userId;
                Id = req.params.Id;
                return [4 /*yield*/, (0, service_1.getOneOrg)(Id)];
            case 1:
                org = _a.sent();
                return [4 /*yield*/, (0, service_1.getOneUser)(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            status: "NotFound",
                            message: "User does not exist",
                            statusCode: 404
                        })];
                }
                if (!org) {
                    return [2 /*return*/, res.status(404).json({
                            status: "Not Found",
                            message: "Organisation does not exist",
                            statusCode: 404
                        })];
                }
                return [4 /*yield*/, (0, service_1.addUserToOrg)(user, org)];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        status: "success",
                        message: "User added to organisation successfully"
                    })];
            case 4:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({
                        status: 'Internal Server Error',
                        message: 'An error occurred during update',
                        statusCode: 500
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.add_UserTo_Org = add_UserTo_Org;
//# sourceMappingURL=organisation.controller.js.map