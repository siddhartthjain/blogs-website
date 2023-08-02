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
    // User.sync(isDev!=='test'?{ alter:true}:{force:true} ),
    // Blogs.sync( isDev!=='test'?{ alter:true}:{force:true} ),
    // Likes.sync(isDev!=='test'?{ alter:true}:{force:true} ),
    ]);
    //    console.log("likes assocition is", Likes.associations)
    // console.log("users asociations", User.associations)
    // console.log("Likes asociations", Likes.associations)
    // console.log("blogs asociations", Blogs.associations)
    blogs_1.default.belongsTo(user_1.default, { as: 'users', foreignKey: 'userId' });
    // console.log("after 1");
    // console.log("users asociations", User.associations)
    // console.log("Likes asociations", Likes.associations)
    // console.log("blogs asociations", Blogs.associations)
    // Blogs.belongsToMany(User,{through: Likes, foreignKey:'blogId', otherKey:'userId'}) 
    // User.belongsToMany(Blogs,{through:Likes, foreignKey:'userId',otherKey:'blogId'})
    user_1.default.hasMany(blogs_1.default, { foreignKey: 'userId' });
    // Blogs.hasMany(Likes,{foreignKey:'blogId'});
    // User.hasMany(Likes,{foreignKey:'userId'});
    // console.log("after 2");
    // console.log("users asociations", User.associations)
    // console.log("Likes asociations", Likes.associations)
    // console.log("blogs asociations", Blogs.associations)
    // Blogs.belongsToMany(User, {
    //     through: Likes,       // Junction table name (Likes model)
    //     foreignKey: 'blogId', // The foreign key in the junction table referencing the Blogs model
    //     otherKey: 'userId',   // The foreign key in the junction table referencing the Users model
    //   });
    // console.log("after 3");
    // console.log("users asociations", User.associations)
    // console.log("Likes asociations", Likes.associations)
    // console.log("blogs asociations", Blogs.associations)
    // User.belongsToMany(Blogs, {
    //   through: Likes,       // Junction table name (Likes model)
    //   foreignKey: 'userId', // The foreign key in the junction table referencing the Blogs model
    //   otherKey: 'blogId',   // The foreign key in the junction table referencing the Users model
    // });
    //   Blogs.belongsToMany(User, {
    //     as:'likedUsers',   // this is important and will tell which user has liked a particluar blog 
    //     through: Likes,       // Junction table name (Likes model)
    //     foreignKey: 'blogId', // The foreign key in the junction table referencing the Blogs model
    //     otherKey: 'userId',   // The foreign key in the junction table referencing the Users model
    //   });
    //   User.belongsToMany(Blogs, {
    //     as:'likedBlogs',    // which blog is liked by particluar user
    //     through: Likes,       
    //     foreignKey: 'userId', 
    //     otherKey: 'blogId',   
    //   });
    //  Likes.belongsTo(Blogs, {foreignKey:"blogId"});
    //  Likes.belongsTo(User, {foreignKey:"userId"});
    console.log("after 4");
    console.log("users asociations", user_1.default.associations);
    console.log("Likes asociations", likes_1.default.associations);
    console.log("blogs asociations", blogs_1.default.associations);
    // console.log("users associations", User.associations)
};
exports.default = dbInit;
//# sourceMappingURL=init.js.map