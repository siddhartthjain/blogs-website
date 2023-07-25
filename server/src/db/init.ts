import Blogs from "./models/blogs"
import User from "./models/user"
import Likes from "./models/likes"
import dotenv from 'dotenv'

dotenv.config()


const isDev= process.env.NODE_ENV
const dbInit=()=>
{
    Promise.all([
        // Blogs.sync({alter:true}),
        // User.sync({alter:true}),
        // Likes.sync({alter:true}),
    ])
//    console.log("likes assocition is", Likes.associations)
console.log("users asociations", User.associations)
console.log("Likes asociations", Likes.associations)
console.log("blogs asociations", Blogs.associations)
    Blogs.belongsTo(User,{as:'users',foreignKey: 'userId'})
    console.log("after 1");
    console.log("users asociations", User.associations)
    console.log("Likes asociations", Likes.associations)
    console.log("blogs asociations", Blogs.associations)

    // Blogs.belongsToMany(User,{through: Likes, foreignKey:'blogId', otherKey:'userId'}) 
    // User.belongsToMany(Blogs,{through:Likes, foreignKey:'userId',otherKey:'blogId'})
    User.hasMany(Blogs,{foreignKey:'userId'})
    console.log("after 2");
    console.log("users asociations", User.associations)
    console.log("Likes asociations", Likes.associations)
    console.log("blogs asociations", Blogs.associations)
    
    Blogs.belongsToMany(User, {
        through: Likes,       // Junction table name (Likes model)
        foreignKey: 'blogId', // The foreign key in the junction table referencing the Blogs model
        otherKey: 'userId',   // The foreign key in the junction table referencing the Users model
      });
      console.log("after 3");
      console.log("users asociations", User.associations)
      console.log("Likes asociations", Likes.associations)
      console.log("blogs asociations", Blogs.associations)
      User.belongsToMany(Blogs, {
        through: Likes,       // Junction table name (Likes model)
        foreignKey: 'userId', // The foreign key in the junction table referencing the Blogs model
        otherKey: 'blogId',   // The foreign key in the junction table referencing the Users model
      });
      console.log("after 4");
      console.log("users asociations", User.associations)
      console.log("Likes asociations", Likes.associations)
      console.log("blogs asociations", Blogs.associations)
    // console.log("users associations", User.associations)
 
}
export default dbInit;