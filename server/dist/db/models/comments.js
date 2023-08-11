"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("./user"));
const blogs_1 = __importDefault(require("./blogs"));
const config_1 = __importDefault(require("../config"));
class Comments extends sequelize_1.Model {
}
Comments.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    comment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    blogId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    parentId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    sequelize: config_1.default,
    modelName: "Comments",
});
blogs_1.default.belongsToMany(user_1.default, {
    as: "usersComments",
    through: {
        model: Comments,
        unique: false
    },
    constraints: false,
    foreignKey: 'blogId',
    otherKey: 'userId',
});
Comments.hasMany(Comments, {
    foreignKey: "parentId",
    as: "replies",
});
exports.default = Comments;
//# sourceMappingURL=comments.js.map