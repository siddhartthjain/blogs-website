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
const init_1 = __importDefault(require("./db/init"));
dotenv_1.default.config(); // read env file
const app = (0, express_1.default)(); // make a app from express
const PORT = process.env.PORT;
// console.log("port is", PORT);
// console.log("password is ", process.env.DB_PASSWORD);
// route termlogy ("path", callbackfnc);
app.use(body_parser_1.default.json());
(0, init_1.default)();
// console.log("i have passed db init");
app.get("/", (req, res) => {
    res.send("Express and typescript server");
});
app.use('/Blogs', BlogsController_1.default);
app.use('/Auth', AuthController_1.default);
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
//# sourceMappingURL=index.js.map