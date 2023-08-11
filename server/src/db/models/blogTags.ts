import { Model, DataTypes } from "sequelize";
import sequelizeConnection from "../config";
import User from "./user";
import Blogs from "./blogs";
import Tags from "./tags";


interface blogTagsAttributes {
    id?:number
    blogId:number;
    tagId: number;

}

class BlogTags extends Model<blogTagsAttributes> implements blogTagsAttributes {
 id?: number;
   blogId!: number;
   tagId!:number;
   
}

BlogTags.init(
  {
    id:
    {
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
   blogId:{
    type:DataTypes.INTEGER,
    allowNull:false,
    references:{
        model:Blogs,
        key: "id"
    }
   },
   tagId:
   {
    type:DataTypes.INTEGER,
    allowNull:false,
    references:{
        model:Tags,
        key:'id'
    }
   }
  },
  {
    sequelize: sequelizeConnection,
    modelName: "BlogTags",
  }
);

Blogs.belongsToMany(Tags,{
    as:"blogTags",
    through:BlogTags,
    foreignKey:'blogId',
    otherKey: 'tagId'
})

export default BlogTags;
