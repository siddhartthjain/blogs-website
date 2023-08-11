import { Model, DataTypes } from "sequelize";
import sequelizeConnection from "../config";
import User from "./user";
import Blogs from "./blogs";

interface tagsAttributes {
    id?:number;
    tag: string
}

class Tags extends Model<tagsAttributes> implements tagsAttributes {
   id!: number;
   tag!:string;
}

Tags.init(
  {
    id: {
      type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
     
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Tags",
  }
);



export default Tags
