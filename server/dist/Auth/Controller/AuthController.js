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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const AuthService_1 = __importDefault(require("../Service/AuthService"));
dotenv_1.default.config();
class AuthController {
    constructor() {
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userBody = req.body;
            const password = userBody.password;
            const hashedPassword = bcrypt_1.default.hashSync(password, 10);
            userBody.password = hashedPassword;
            try {
                const userExists = yield this.authService.findOneEmail(userBody.email);
                if (userExists) {
                    res.status(400).json({ message: "User already exists" });
                }
                else {
                    res.json({ message: yield this.authService.createUser(userBody) });
                }
            }
            catch (error) {
                console.log(error);
                res.json({ error: "error in creating user" });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userExists = yield this.authService.findOneEmail(email);
                if (userExists) {
                    const userPassword = userExists === null || userExists === void 0 ? void 0 : userExists.password;
                    const passMatched = bcrypt_1.default.compareSync(password, userPassword);
                    if (passMatched) {
                        const secretKey = process.env.SECRET_KEY;
                        const payload = { id: userExists.id, email: userExists.email };
                        const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "6d" });
                        const response = { userId: userExists.id, token: token };
                        res.json({ message: "succesfully logged in", response });
                    }
                    else {
                        throw new Error("password is wrong");
                    }
                }
                else {
                    throw new Error("User Doesnt Exists Please Sign in");
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ success: false, error });
            }
        });
        this.loginPage = (req, res) => {
            res.render("login");
        };
        this.authService = new AuthService_1.default();
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map