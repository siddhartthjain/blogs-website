import  MockSequelize  from 'sequelize-mock';

// Create a new Sequelize instance with the mock database
export const sequelize = new MockSequelize();

// Define your models and associations in the mock database
export const User = sequelize.define('User', {
    id:'integer',
  name: 'string',
  email: 'string',
  password: "string",
  provider: "string"
});

export const Blogs = sequelize.define('Blog', {
  id: "integer",
  title: 'string',
  likes: 'integer',
  description : "text",
  userId: "integer"
});

export const BlogTags = sequelize.define('BlogTags',{
    id: "integer",
    blogId: "integer",
    tagId:"integer"
})

export const Tags = sequelize.define('Tags',{
    id: "integer",
    tag: "string",
})

export const Comments = sequelize.define('Comments',{
    id: "integer",
  comment: "string",
  userId: "integer",
  blogId: "integer",
  parentId: "integer"
})
export const Likes = sequelize.define('Likes',{
  userId: "integer",
  blogId: "integer",
  
})

User.hasMany(Blogs);
Blogs.belongsToMany(Tags,{
    as:"blogTags",
    through:BlogTags,
    foreignKey:'blogId',
    otherKey: 'tagId'
})

Blogs.belongsToMany(User,{
    as:"usersComments",
    through:{
      model:Comments,
      unique:false
    },
    constraints:false,
    foreignKey:'blogId',
    otherKey:'userId',
  
})
Comments.hasMany(Comments,{
    foreignKey:"parentId",
    as: "replies",
})

Blogs.belongsToMany(User, {
    as: "likedUsers", // this is important and will tell which user has liked a particluar blog
    through: Likes, // Junction table name (Likes model)
    foreignKey: "blogId", // The foreign key in the junction table referencing the Blogs model
    otherKey: "userId", // The foreign key in the junction table referencing the Users model
  });
  User.belongsToMany(Blogs, {
    as: "likedBlogs", // which blog is liked by particluar user
    through: Likes,
    foreignKey: "userId",
    otherKey: "blogId",
  });
  Likes.belongsTo(Blogs, { foreignKey: "blogId" });
  Likes.belongsTo(User, { foreignKey: "userId" });

  Blogs.belongsTo(User, { as: "users", foreignKey: "userId" });
  User.hasMany(Blogs, { foreignKey: "userId" });
  Blogs.hasMany(Comments,{
    as:"CommentsOnBLog",
    foreignKey:'blogId'
  })

// export { sequelize, UserModel, BlogModel };
