"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../Controller/AuthController"));
const validate_1 = require("../../Validation/validate");
const Dto_1 = require("../Dto");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
const authController = new AuthController_1.default();
router.get('/LoginPage', authController.loginPage);
router.post('/Login', (0, validate_1.validationMiddleware)(Dto_1.LoginDto), authController.login);
router.post('/SignUp', (0, validate_1.validationMiddleware)(Dto_1.SignupDto), authController.signUp);
router.get('/google', passport_1.default.authenticate('google', { scope: ["email", "profile"], }));
router.get("/google/redirect", passport_1.default.authenticate("google"), (req, res) => {
    if (req.user) {
        res.json({ message: "Ypu have succesfully logged in", token: req.user });
    }
});
module.exports = router;
//# sourceMappingURL=AuthRoutes.js.map