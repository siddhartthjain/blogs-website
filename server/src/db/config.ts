import dotenv from 'dotenv'
dotenv.config();
import { Dialect, Sequelize } from "sequelize";

const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbUsername= process.env.DB_USERNAME as string;
const dbName = process.env.DB_DATABASE as string;
const dbPassword= process.env.DB_PASSWORD
 
const sequelizeConnection = new Sequelize(dbName,dbUsername, dbPassword,{
    host: dbHost,
    dialect: dbDriver,

})

sequelizeConnection.authenticate().then(()=>{console.log("db connected Succesfully")}).catch((err)=>{console.log("not able to connect ",err)});
export default sequelizeConnection;
  