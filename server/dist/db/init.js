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
    // User.sync(isDev!=='test'?{ alter:true}:{force:true} ),
    // Blogs.sync( isDev!=='test'?{ alter:true}:{force:true} ),
    // Likes.sync(isDev!=='test'?{ alter:true}:{force:true} ),
    ]);
    blogs_1.default.belongsTo(user_1.default, { as: "users", foreignKey: "userId" });
    user_1.default.hasMany(blogs_1.default, { foreignKey: "userId" });
};
exports.default = dbInit;
//# sourceMappingURL=init.js.map