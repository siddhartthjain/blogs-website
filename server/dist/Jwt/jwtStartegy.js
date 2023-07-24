"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    var _a;
    console.log("i am in auth middle wares");
    try {
        const secretKey = process.env.SECRET_KEY;
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', "");
        if (!token) {
            throw new Error();
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        console.log('decoded value is', decoded);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.sendStatus(401);
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=jwtStartegy.js.map