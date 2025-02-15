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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../src/index")); // Adjust the path to your app file
var database_source_1 = require("../../src/database/database-source");
var userService = __importStar(require("../../src/service/user.service"));
var bcrypt = __importStar(require("bcryptjs"));
var orgService = __importStar(require("../../src/service/organisation.service"));
jest.mock('../../src/service/user.service.ts');
jest.mock('bcryptjs');
jest.mock('../../src/service/organisation.service');
describe('Auth Endpoints', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_source_1.connectionSource.initialize()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () {
        jest.clearAllMocks();
    });
    describe('POST /api/auth/register', function () {
        it('should register a user successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userData, createdUser, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = {
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john.doe@example.com',
                            password: 'password123',
                            phone: "08105765035"
                        };
                        createdUser = __assign(__assign({}, userData), { id: '123', createdAt: new Date(), updatedAt: new Date() });
                        userService.createUser.mockResolvedValue(createdUser);
                        userService.getUserEmail.mockResolvedValue(null);
                        orgService.createOrganisation.mockResolvedValue({
                            name: "".concat(createdUser.firstName, "Organisation"),
                            description: "This is the default organisation for ".concat(createdUser.firstName, " ").concat(createdUser.lastName, "."),
                            users: [createdUser]
                        });
                        return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                                .post('/api/auth/register')
                                .send(userData)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(201);
                        expect(response.body).toMatchObject({
                            status: 'success',
                            message: 'Registration successful',
                            data: {
                                user: {
                                    firstName: 'John',
                                    lastName: 'Doe',
                                    email: 'john.doe@example.com'
                                }
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 409 if email already exists', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userData, existingUser, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = {
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john.doe@example.com',
                            password: 'password123',
                            phone: "081056750353"
                        };
                        existingUser = __assign(__assign({}, userData), { id: '123', createdAt: new Date(), updatedAt: new Date() });
                        userService.getUserEmail.mockResolvedValue(existingUser);
                        return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                                .post('/api/auth/register')
                                .send(userData)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(409);
                        expect(response.body).toMatchObject({
                            status: 'Conflict',
                            message: 'This email is already in use',
                            statusCode: 409
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 422 for validation errors', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                            .post('/api/auth/register')
                            .send({ email: 'invalidEmail' })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(422);
                        expect(response.body).toHaveProperty('errors');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('POST /api/auth/login', function () {
        it('should login a user successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var registerData, hashedPassword, createdUser, loginData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        registerData = {
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john.doe@example.com',
                            password: 'password123'
                        };
                        return [4 /*yield*/, bcrypt.hash(registerData.password, 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        createdUser = __assign(__assign({}, registerData), { id: '123', password: hashedPassword, createdAt: new Date(), updatedAt: new Date() });
                        userService.createUser.mockResolvedValue(createdUser);
                        userService.getUserEmail.mockResolvedValue(createdUser);
                        bcrypt.compare.mockResolvedValue(true);
                        loginData = {
                            email: 'john.doe@example.com',
                            password: 'password123'
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                                .post('/api/auth/login')
                                .send(loginData)];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toMatchObject({
                            status: 'successful',
                            message: 'Login successful',
                            data: {
                                user: {
                                    email: 'john.doe@example.com'
                                }
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 404 for non-existing user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userService.getUserEmail.mockResolvedValue(null);
                        return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                                .post('/api/auth/login')
                                .send({ email: 'nonexistent@example.com', password: 'password123' })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(404);
                        expect(response.body).toMatchObject({
                            status: 'NotFound',
                            message: 'Invalid credential',
                            statusCode: 404
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 401 for invalid password', function () { return __awaiter(void 0, void 0, void 0, function () {
            var registerData, hashedPassword, createdUser, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        registerData = {
                            firstName: 'John',
                            lastName: 'Doe',
                            email: 'john.doe@example.com',
                            password: 'password123'
                        };
                        return [4 /*yield*/, bcrypt.hash(registerData.password, 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        createdUser = __assign(__assign({}, registerData), { id: '123', password: hashedPassword, createdAt: new Date(), updatedAt: new Date() });
                        userService.getUserEmail.mockResolvedValue(createdUser);
                        bcrypt.compare.mockResolvedValue(false); // Mock password comparison
                        return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                                .post('/api/auth/login')
                                .send({ email: 'john.doe@example.com', password: 'wrongPassword' })];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        expect(response.body).toMatchObject({
                            status: 'Bad Request',
                            message: 'Invalid credentials',
                            statusCode: 401
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 422 for validation errors', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.default)
                            .post('/api/auth/login')
                            .send({ email: 'invalidEmail' })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(422);
                        expect(response.body).toHaveProperty('errors');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_source_1.connectionSource.destroy()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=auth.spec.js.map