import Blogs from "./models/blogs"
import User from "./models/user"
import dotenv from 'dotenv'
dotenv.config()

const isDev= process.env.NODE_ENV
const dbInit=()=>
{
    Promise.all([
        Blogs.sync({alter: !!isDev}),
        User.sync({alter: !!isDev}),
    ])
    User.hasMany(Blogs,{as: 'blogs'});
    Blogs.belongsTo(User,{foreignKey: 'userId'})
}
export default dbInit;