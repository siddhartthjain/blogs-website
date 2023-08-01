"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const BlogsController_1 = __importDefault(require("./Blogs/Controllers/BlogsController"));
const AuthController_1 = __importDefault(require("./Auth/Controllers/AuthController"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./config/passport");
const express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config(); // read env file
const app = (0, express_1.default)(); // make a app from express
const PORT = process.env.PORT;
// console.log("port is", PORT);
// console.log("password is ", process.env.DB_PASSWORD);
// route termlogy ("path", callbackfnc);
app.use(body_parser_1.default.json());
// dbInit();
// console.log("i have passed db init");
app.set('view engine', "ejs");
app.get("/", (req, res) => {
    res.send("Express and typescript server");
});
app.use((0, express_session_1.default)({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET"
}));
app.use('/Blogs', BlogsController_1.default);
app.use('/Auth', AuthController_1.default);
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map