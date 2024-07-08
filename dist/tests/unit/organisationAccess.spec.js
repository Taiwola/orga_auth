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
var organisation_controller_1 = require("../../src/controller/organisation.controller"); // Replace with actual path
var organisation_service_1 = require("../../src/service/organisation.service"); // Replace with actual path
var user_service_1 = require("../../src/service/user.service"); // Replace with actual path
// Mock the organisation and user services
jest.mock('../../src/service/organisation.service');
jest.mock('../../src/service/user.service');
// Mock data
var mockOrganisation = {
    orgId: 'org_id_123',
    name: 'Test Organisation',
    description: "A test organisation",
    users: [{
            userId: 'user_id_123',
            firstName: 'Test User',
            lastName: 'User',
            email: 'test.user@email.com',
            password: "cepclc",
            phone: "123-231-342",
            createdAt: new Date(),
            updatedAt: new Date(),
        }],
    // Add other fields as needed
};
var mockUser = {
    userId: 'user_id_123',
    firstName: 'Test User',
    lastName: 'User',
    email: 'test.user@email.com',
    password: "cepclc",
    phone: "123-231-342",
    createdAt: new Date(),
    updatedAt: new Date(),
};
describe('Organisation Controller Access Tests', function () {
    afterEach(function () {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    it('should return 200 and the organisation details if user has access', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockRequest, mockResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Mock getOneOrg and getOneUser to return the mock data
                    organisation_service_1.getOneOrg.mockResolvedValue(mockOrganisation);
                    user_service_1.getOneUser.mockResolvedValue(mockUser);
                    mockRequest = {
                        params: { Id: mockOrganisation.orgId },
                        user: { userId: mockUser.userId } // Simulate user with access
                    };
                    mockResponse = {
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn(),
                    };
                    return [4 /*yield*/, (0, organisation_controller_1.get_one_org)(mockRequest, mockResponse)];
                case 1:
                    _a.sent();
                    expect(mockResponse.status).toHaveBeenCalledWith(200);
                    expect(mockResponse.json).toHaveBeenCalledWith({
                        status: 'success',
                        message: 'Organisation found',
                        data: mockOrganisation,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return 403 if user does not have access to the organisation', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockRequest, mockResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Mock getOneOrg to return the mock organisation
                    organisation_service_1.getOneOrg.mockResolvedValue(mockOrganisation);
                    mockRequest = {
                        params: { Id: 'org_id_123' },
                        user: { userId: 'user_id_without_access' } // Simulate user without access
                    };
                    mockResponse = {
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn(),
                    };
                    return [4 /*yield*/, (0, organisation_controller_1.get_one_org)(mockRequest, mockResponse)];
                case 1:
                    _a.sent();
                    expect(mockResponse.status).toHaveBeenCalledWith(403);
                    expect(mockResponse.json).toHaveBeenCalledWith({
                        status: 'Forbidden',
                        message: 'You do not have access to view this organisation',
                        statusCode: 403,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return 404 if organisation does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockRequest, mockResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Mock getOneOrg to return null for non-existing org
                    organisation_service_1.getOneOrg.mockResolvedValue(null);
                    mockRequest = {
                        params: { Id: 'non_existing_org_id' },
                        user: { userId: 'user_id_1' } // Simulate user with access
                    };
                    mockResponse = {
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn(),
                    };
                    return [4 /*yield*/, (0, organisation_controller_1.get_one_org)(mockRequest, mockResponse)];
                case 1:
                    _a.sent();
                    expect(mockResponse.status).toHaveBeenCalledWith(404);
                    expect(mockResponse.json).toHaveBeenCalledWith({
                        status: 'Not Found',
                        message: 'Organisation does not exist',
                        statusCode: 404,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=organisationAccess.spec.js.map