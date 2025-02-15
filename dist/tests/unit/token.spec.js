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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("../../src/middleware/token");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe('Token Generation', function () {
    it('should generate a token with correct user details', function () { return __awaiter(void 0, void 0, void 0, function () {
        var email, userId, token, decoded;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = 'john.doe@example.com';
                    userId = '12345';
                    return [4 /*yield*/, (0, token_1.generateJwt)(email, userId)];
                case 1:
                    token = _a.sent();
                    decoded = jsonwebtoken_1.default.decode(token);
                    console.log(decoded);
                    expect(decoded.email).toBe(email);
                    expect(decoded.id).toBe(userId);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should expire the token at the correct time', function () { return __awaiter(void 0, void 0, void 0, function () {
        var email, userId, token, decoded, currentTime, expectedExpiration;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = 'john.doe@example.com';
                    userId = '12345';
                    return [4 /*yield*/, (0, token_1.generateJwt)(email, userId)];
                case 1:
                    token = _a.sent();
                    decoded = jsonwebtoken_1.default.decode(token);
                    currentTime = Math.floor(Date.now() / 1000);
                    expectedExpiration = currentTime + 86400;
                    expect(decoded.exp).toBeCloseTo(expectedExpiration, -1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should verify a valid token successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var email, userId, token, verified;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = 'john.doe@example.com';
                    userId = '12345';
                    return [4 /*yield*/, (0, token_1.generateJwt)(email, userId)];
                case 1:
                    token = _a.sent();
                    verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                    expect(verified).toHaveProperty('email', email);
                    expect(verified).toHaveProperty('id', userId);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not verify an invalid token', function () {
        var token = 'invalid.token.string';
        expect(function () { return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET); }).toThrow();
    });
});
//# sourceMappingURL=token.spec.js.map