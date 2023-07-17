"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const BlogsController_1 = __importDefault(require("./Blogs/Controllers/BlogsController"));
const UserController_1 = __importDefault(require("./User/Controllers/UserController"));
const models_1 = __importDefault(require("./models"));
dotenv_1.default.config(); // read env file
const app = (0, express_1.default)(); // make a app from express
const PORT = process.env.PORT;
// route termlogy ("path", callbackfnc);
app.use('/blogs', BlogsController_1.default);
app.use('/user', UserController_1.default);
app.get("/", (req, res) => {
    res.send("Express and typescript server");
});
// app.listen (portno,callback(if succesfull)) 
models_1.default.sequelize.then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`);
    });
});
