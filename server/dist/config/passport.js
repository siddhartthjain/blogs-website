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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const user_1 = __importDefault(require("../db/models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findByPk(id);
    done(null, user);
}));
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/redirect",
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    if (profile) {
        const { emails, displayName, provider } = profile;
        const userEmailid = emails ? emails[0].value : "";
        const userName = displayName;
        const userProvider = provider;
        let user = null;
        user = yield user_1.default.findOne({ where: { email: userEmailid } });
        if (!user) {
            user = yield user_1.default.create({ name: userName, email: userEmailid, provider: userProvider });
        }
        const secretKey = process.env.SECRET_KEY;
        const payload = { id: user.id, email: user.email };
        const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '6d' });
        done(null, token);
    }
})));
//# sourceMappingURL=passport.js.map