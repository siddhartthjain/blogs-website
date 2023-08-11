import { DataTypes, Model } from "sequelize";
import User from "./user";
import Blogs from "./blogs";
import sequelizeConnection from "../config";

interface commentsAttributes {
  id?: number;
  comment: string;
  userId: number;
  blogId: number;
  parentId?: number;
}

class Comments extends Model<commentsAttributes> implements commentsAttributes {
  id: number;
  comment: string;
  userId: number;
  blogId: number;
  parentId?: number;
}
Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
     
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
     
    },
    parentId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Comments",
  }
);

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


export default Comments;
