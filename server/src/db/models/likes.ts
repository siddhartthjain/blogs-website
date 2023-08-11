import { Model, DataTypes } from "sequelize";
import sequelizeConnection from "../config";
import User from "./user";
import Blogs from "./blogs";

interface likesAttributes {
  userId: number;
  blogId: number;
}

class Likes extends Model<likesAttributes> implements likesAttributes {
  userId!: number;
  blogId!: number;
}

Likes.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Blogs,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Likes",
  }
);

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

export default Likes;
