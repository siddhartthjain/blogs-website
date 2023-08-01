import dotenv from 'dotenv'
dotenv.config();
import { Dialect, Sequelize } from "sequelize";

let dbHost = process.env.DB_HOST;
let dbDriver = process.env.DB_DRIVER as Dialect;
let dbUsername= process.env.DB_USERNAME as string;
let dbName = process.env.DB_DATABASE as string;
let dbPassword= process.env.DB_PASSWORD

if(process.env.NODE_ENV == 'test')
{
 dbHost = process.env.DB_HOST;
 dbDriver = process.env.DB_DRIVER as Dialect;
 dbUsername= process.env.DB_USERNAME as string;
 dbName = process.env.DB_DATABASE_TEST as string;
 dbPassword= process.env.DB_PASSWORD
}
 
const sequelizeConnection = new Sequelize(dbName,dbUsername, dbPassword,{
    host: dbHost,
    dialect: dbDriver,

})

sequelizeConnection.authenticate().then(()=>{console.log("db connected Succesfully")}).catch((err)=>{console.log("not able to connect ",err)});
export default sequelizeConnection;
  