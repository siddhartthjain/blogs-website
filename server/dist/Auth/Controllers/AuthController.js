"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const AuthService_1 = require("../Service/AuthService");
const validate_1 = require("../../Validation/validate");
const Dto_1 = require("../Service/Dto");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get('/LoginPage', AuthService_1.loginPage);
router.post('/Login', (0, validate_1.validationMiddleware)(Dto_1.LoginDto), AuthService_1.login);
router.post('/SignUp', (0, validate_1.validationMiddleware)(Dto_1.SignupDto), AuthService_1.signUp);
router.get('/google', passport_1.default.authenticate('google', { scope: ["email", "profile"], }));
router.get("/google/redirect", passport_1.default.authenticate("google"), (req, res) => {
    res.redirect('/blogs');
});
module.exports = router;
//# sourceMappingURL=AuthController.js.map