"use strict";
import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../config";
import User from "./user";

interface BlogsAttributes {
  id?: number;
  title: string;
  likes?: number;
  description: string;
  userId: number;
}

class Blogs extends Model<BlogsAttributes> implements BlogsAttributes {
  public id!: number;
  title!: string;
  likes: number;
  description!: string;
  userId!: number;
}
Blogs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Blogs",
  }
);

export default Blogs;
