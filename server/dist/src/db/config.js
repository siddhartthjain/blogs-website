"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize_1 = require("sequelize");
let dbHost = process.env.DB_HOST;
let dbDriver = process.env.DB_DRIVER;
let dbUsername = process.env.DB_USERNAME;
let dbName = process.env.DB_DATABASE;
let dbPassword = process.env.DB_PASSWORD;
if (process.env.NODE_ENV == 'test') {
    dbHost = process.env.DB_HOST;
    dbDriver = process.env.DB_DRIVER;
    dbUsername = process.env.DB_USERNAME;
    dbName = process.env.DB_DATABASE_TEST;
    dbPassword = process.env.DB_PASSWORD;
}
const sequelizeConnection = new sequelize_1.Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
});
sequelizeConnection.authenticate().then(() => { console.log("db connected Succesfully"); }).catch((err) => { console.log("not able to connect ", err); });
exports.default = sequelizeConnection;
//# sourceMappingURL=config.js.map