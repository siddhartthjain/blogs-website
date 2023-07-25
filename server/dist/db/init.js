"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogs_1 = __importDefault(require("./models/blogs"));
const user_1 = __importDefault(require("./models/user"));
const likes_1 = __importDefault(require("./models/likes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isDev = process.env.NODE_ENV;
const dbInit = () => {
    Promise.all([
    // Blogs.sync({alter:true}),
    // User.sync({alter:true}),
    // Likes.sync({alter:true}),
    ]);
    //    console.log("likes assocition is", Likes.associations)
    console.log("users asociations", user_1.default.associations);
    console.log("Likes asociations", likes_1.default.associations);
    console.log("blogs asociations", blogs_1.default.associations);
    blogs_1.default.belongsTo(user_1.default, { as: 'users', foreignKey: 'userId' });
    console.log("after 1");
    console.log("users asociations", user_1.default.associations);
    console.log("Likes asociations", likes_1.default.associations);
    console.log("blogs asociations", blogs_1.default.associations);
    // Blogs.belongsToMany(User,{through: Likes, foreignKey:'blogId', otherKey:'userId'}) 
    // User.belongsToMany(Blogs,{through:Likes, foreignKey:'userId',otherKey:'blogId'})
    user_1.default.hasMany(blogs_1.default, { foreignKey: 'userId' });
    console.log("after 2");
    console.log("users asociations", user_1.default.associations);
    console.log("Likes asociations", likes_1.default.associations);
    console.log("blogs asociations", blogs_1.default.associations);
    blogs_1.default.belongsToMany(user_1.default, {
        through: likes_1.default,
        foreignKey: 'blogId',
        otherKey: 'userId', // The foreign key in the junction table referencing the Users model
    });
    console.log("after 3");
    console.log("users asociations", user_1.default.associations);
    console.log("Likes asociations", likes_1.default.associations);
    console.log("blogs asociations", blogs_1.default.associations);
    user_1.default.belongsToMany(blogs_1.default, {
        through: likes_1.default,
        foreignKey: 'userId',
        otherKey: 'blogId', // The foreign key in the junction table referencing the Users model
    });
    console.log("after 4");
    console.log("users asociations", user_1.default.associations);
    console.log("Likes asociations", likes_1.default.associations);
    console.log("blogs asociations", blogs_1.default.associations);
    // console.log("users associations", User.associations)
};
exports.default = dbInit;
//# sourceMappingURL=init.js.map