'use strict';
import {DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../config';
// import Blogs from './blogs';


interface UserAttributes 
{
  id?:number;
  name: string;
  email : string;
  password?: string;
  provider?:string;

} 

  class User extends Model<UserAttributes> implements UserAttributes {
    /** 
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */ 
   id!:number;
  name!: string;
  email! : string;
  password: string;
  provider:string;
   
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement : true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provider:
    {
      type:DataTypes.STRING,
      allowNull:true
    }
  }, {
    sequelize: sequelizeConnection,
    modelName: 'User',
  });
  
  export default User;
