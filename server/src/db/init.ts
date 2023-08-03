import Blogs from "./models/blogs";
import User from "./models/user";
import Likes from "./models/likes";
import dotenv from "dotenv";

dotenv.config();

const isDev = process.env.NODE_ENV as string;
const dbInit = () => {
  Promise.all([
    // User.sync(isDev!=='test'?{ alter:true}:{force:true} ),
    // Blogs.sync( isDev!=='test'?{ alter:true}:{force:true} ),
    // Likes.sync(isDev!=='test'?{ alter:true}:{force:true} ),
  ]);

  Blogs.belongsTo(User, { as: "users", foreignKey: "userId" });

  User.hasMany(Blogs, { foreignKey: "userId" });
};
export default dbInit;
