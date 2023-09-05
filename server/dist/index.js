"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const BlogsRoutes_1 = __importDefault(require("./Blogs/Routes/BlogsRoutes"));
const AuthRoutes_1 = __importDefault(require("./Auth/Routes/AuthRoutes"));
const commentsRoutes_1 = __importDefault(require("./Comments/Routes/commentsRoutes"));
const tagsController_1 = __importDefault(require("./Tags/Controller/tagsController"));
const body_parser_1 = __importDefault(require("body-parser"));
const init_1 = __importDefault(require("./db/init"));
require("./config/passport");
const express_session_1 = __importDefault(require("express-session"));
const swaggerDocument = __importStar(require("./swagger.json"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config(); // read env file
const app = (0, express_1.default)(); // make a app from express
const PORT = process.env.PORT;
// route termlogy ("path", callbackfnc);
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, init_1.default)();
app.set('view engine', "ejs");
app.get("/", (req, res) => {
    res.send("Express and typescript server");
});
app.use((0, express_session_1.default)({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET"
}));
app.use('/Blogs/:id/comment', commentsRoutes_1.default);
app.use("/Blogs/:id/Tags", tagsController_1.default);
app.use('/Blogs', BlogsRoutes_1.default);
app.use('/Auth', AuthRoutes_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map