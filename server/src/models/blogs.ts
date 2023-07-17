'use strict';
import {Model} from 'sequelize'
module.exports = (sequelize, DataTypes) => {


  interface BlogsAttributes 
{
  id:number
  title:number;
  description: string;
  userId : number;
} 
  class Blogs extends Model<BlogsAttributes> implements BlogsAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id: number;
    title:number;
  description: string;
  userId : number;
    static associate(models) {
       Blogs.hasOne(models.User,{foreignKey : 'User.id'})
    }
  }
  Blogs.init({
    id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }, 
    title: 
    {
      type: DataTypes.STRING,
    allowNull: false
    },
    description: 
    {
      type: DataTypes.TEXT,
    allowNull: false
    },
    userId:
    {
      type:DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'Blogs',
  });
  return Blogs;
};