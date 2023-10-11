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
const user_1 = __importDefault(require("../../db/models/user"));
class AuthService {
    constructor() {
        this.findOneEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            return user_1.default.findOne({ where: { email: email } });
        });
        this.createUser = (inputs) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = inputs;
                const user = yield user_1.default.create({ name, email, password });
                return ({ resp: `user has been created with ${user.id}` });
            }
            catch (error) {
                console.log(error);
                throw new Error("Not able to Create New User");
            }
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map