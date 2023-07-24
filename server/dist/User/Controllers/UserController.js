"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const UserService_1 = require("../Service/UserService");
const router = express_1.default.Router();
router.get('/Login', UserService_1.Login);
router.post('/SignUp', UserService_1.signUp);
module.exports = router;
//# sourceMappingURL=UserController.js.map