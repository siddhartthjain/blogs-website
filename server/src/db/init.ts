import Blogs from "./models/blogs";
import User from "./models/user";
import Likes from "./models/likes";
import Tags from "./models/tags"
import BlogTags from "./models/blogTags"
import dotenv from "dotenv";
import Comments from "./models/comments";

dotenv.config();

const isDev = process.env.NODE_ENV as string;
const dbInit = () => {
  Promise.all([
    // User.sync(isDev!=='test'?{ alter:true}:{force:true} ),
    // Blogs.sync( isDev!=='test'?{ alter:true}:{force:true} ),
    // Likes.sync(isDev!=='test'?{ alter:true}:{force:true} ),
    // Comments.sync(isDev!=='test'?{ alter:true}:{force:true}  ),
    // Tags.sync(isDev!=='test'?{ alter:true}:{force:true} ),
    // BlogTags.sync(isDev!=='test'?{ alter:true}:{force:true}),
  ]);

 
  Blogs.belongsTo(User, { as: "users", foreignKey: "userId" });
  User.hasMany(Blogs, { foreignKey: "userId" });
  Blogs.hasMany(Comments,{
    as:"CommentsOnBlog",
    foreignKey:'blogId'
  })
};
export default dbInit;
