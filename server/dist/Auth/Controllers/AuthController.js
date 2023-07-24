"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const AuthService_1 = require("../Service/AuthService");
const validate_1 = require("../../Validation/validate");
const Dto_1 = require("../Service/Dto");
const router = express_1.default.Router();
router.get('/Login', (0, validate_1.validationMiddleware)(Dto_1.LoginDto), AuthService_1.login);
router.post('/SignUp', (0, validate_1.validationMiddleware)(Dto_1.SignupDto), AuthService_1.signUp);
module.exports = router;
//# sourceMappingURL=AuthController.js.map