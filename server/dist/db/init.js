"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogs_1 = __importDefault(require("./models/blogs"));
const user_1 = __importDefault(require("./models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isDev = process.env.NODE_ENV;
const dbInit = () => {
    Promise.all([
        blogs_1.default.sync({ alter: !!isDev }),
        user_1.default.sync({ alter: !!isDev }),
    ]);
    user_1.default.hasMany(blogs_1.default, { as: 'blogs' });
    blogs_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
};
exports.default = dbInit;
//# sourceMappingURL=init.js.map